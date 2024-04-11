import { existsSync, promises as fs } from "fs";
import ora from "ora";
import path from "path";
import { Command } from "commander";
import { z } from "zod";
import chalk from "chalk";
import prompts from "prompts";
import { execa } from "execa";

const { detect: detectPackageManager } = require("detect-package-manager");
// import { detect as detectPackageManager } from "detect-package-manager";

import { logger, handleError } from "@/src/utils";
import {
  type TTempConfig, fetchTree, getItemTargetPath, getRegistryIndex, resolveTree
} from "@/src/utils/registry";
import { TRegistryIndexItem, TRegistryIndexItemFile, registryIndexItemSchema } from "@/src/utils/registry/schema";
import { kebabToPascalCase } from "@/src/utils/stringUtils";
import {
  computePackageManagerAddCommand, computePackageManagerDevDependencyFlag
} from "../utils/packageManagerHelpers";

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  skipConfirmationPrompt: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  allComponents: z.boolean(),
  path: z.string().optional()
});

export const add = new Command()
  .name("add")
  .description("Add one or more components to your project.")
  .argument("[components...]", "The components you'd like to add.")
  .option("-y, --yes", "Skip the confirmation prompt.", true)
  .option("-o, --overwrite", "Overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "The chosen working directory. Defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "Add all available components to your project.", false)
  .option("-p, --path <path>", "A path to the directory where your chosen components should be added. Defaults to 'components'.", "components")
  .action(async (components, CLIOptions) => {
    try {
      const options = addOptionsSchema.parse({ components, ...CLIOptions });

      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} could not be found. Please try again.`);
        process.exit(1);
      }
      
      // const config = await getConfig(cwd);
      // if (!config) {
      //   logger.warn(
      //     `No existing configuration found. Please run the ${chalk.green(`init`)} command to generate a components.json file.`
      //   );
      //   process.exit(1);
      // }

      const registryIndex = await getRegistryIndex();

      let selectedComponents = (options.allComponents) ?
        registryIndex.map((entry: z.infer<typeof registryIndexItemSchema>) => entry.name) : options.components;

      if (!options.components?.length && !options.allComponents) {
        const { components } = await prompts({
          type: "multiselect",
          name: "components",
          message: "Which components would you like to add to your project?",
          hint: `Press ${chalk.green("<space>")} to select a component.
            Press ${chalk.green("<a>")} to toggle selection for all.
            Press ${chalk.green("<enter>")} when your selection is complete.
          `,
          instructions: false,
          choices: registryIndex.map((item: TRegistryIndexItem) => ({
            title: item.name,
            value: item.name,
            selected: options.allComponents ? true : options.components?.includes(item.name)
          }))
        });

        selectedComponents = components;
      }

      if (!selectedComponents?.length) {
        logger.warn("No components were selected. Please try again.");
        process.exit(0);
      }

      const tree = await resolveTree(registryIndex, selectedComponents);
      const resolvedPayload = await fetchTree(tree);

      if (!resolvedPayload?.length) {
        logger.warn("The components you selected could not be found.");
        process.exit(0);
      }

      if (!options.skipConfirmationPrompt) {
        const { proceed } = await prompts({
          type: "confirm",
          name: "proceed",
          message: "Are you sure you would like to add the selected components?",
          initial: true
        });

        if (!proceed) process.exit(0);
      }

      const spinner = ora(`Installing selected components...`).start();

      const config: TTempConfig = {};
      
      // TODO: -> Remove :any type when fetchTree is implemented
      resolvedPayload.forEach(async (item: any) => {
        spinner.text = `Installing ${item.name}...`;

        const targetPath = await getItemTargetPath(
          config, options.path ? path.resolve(cwd, options.path) : undefined
        );

        // - TODO: Potentially remove this depending on implementation of getItemTargetPath()
        if (!targetPath) return;

        if (!existsSync(targetPath)) fs.mkdir(targetPath, { recursive: true });

        const componentExists = existsSync(path.resolve(targetPath, kebabToPascalCase(item.name)));

        if (componentExists && !options.overwrite) {
          if (selectedComponents.includes(item.name)) {
            spinner.stop()
            const { overwrite } = await prompts({
              type: "confirm",
              name: "overwrite",
              message: `Component ${item.name} already exists. Would you like to overwrite its content?`,
              initial: false,
            });

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite its content, run the command with the ${chalk.green("--overwrite")} flag.`
              );
    
              return;
            }

            spinner.start(`Installing ${item.name}...`)
          }
          
          else return;

          spinner.stop();
          logger.warn(`The ${item.name} component already exists. Skipping...`);
          return;
        }

        fs.mkdir(kebabToPascalCase(item.name), { recursive: true });

        item.files.forEach(async (file: TRegistryIndexItemFile) => {
          let filePath = path.resolve(targetPath, kebabToPascalCase(item.name), file.name);
          
          // - TODO: -> Run code transforms here.

          await fs.writeFile(filePath, item.content);
        });

        const packageManager = detectPackageManager();
        const packageManagerAddCommand = computePackageManagerAddCommand(packageManager);
        const packageManagerDevDependencyFlag = computePackageManagerDevDependencyFlag(packageManager);

        if (item.dependencies?.length) {
          await execa(
            packageManager,
            [
              packageManagerAddCommand,
              ...item.dependencies
            ],
            { cwd }
          );
        }

        if (item.devDependencies?.length) {
          await execa(
            packageManager,
            [
              packageManagerAddCommand,
              ...item.devDependencies,
              packageManagerDevDependencyFlag
            ],
            { cwd }
          );
        }
      });

      spinner.succeed("Selected components were installed successfully.");
    } catch (error) {
      handleError(error);
    }
  });
