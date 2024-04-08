import { existsSync, promises as fs } from "fs";
import ora from "ora";
import path from "path";
import { Command } from "commander";
import { z } from "zod";
import chalk from "chalk";
import prompts from "prompts";

import { logger, handleError } from "@/src/utils";
import { getRegistryIndex } from "../utils/registry/schema";

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
    "c, --cwd <cwd>",
    "The working directory. Defaults to the current directory.",
    process.cwd()
  )
  .option("a, --all", "Add all available components to your project.", false)
  .option("p, --path <path>", "The path to where components should be added.", "components")
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
        registryIndex.map((entry) => entry.name) : options.components;

      if (!options.components?.length && !options.allComponents) {
        const { components } = await prompts({
          type: "multiselect",
          name: "components",
          message: "Which components would you like to add to your project?",
          hint: "Press <space> to select a component. Press <a> to toggle selection for all. Press <enter> when your selection is complete.",
          instructions: false,
          choices: registryIndex.map((entry) => ({
            title: entry.name,
            value: entry.name,
            selected: options.allComponents ? true : options.components?.includes(entry.name)
          }))
        });

        selectedComponents = components;
      }

      if (!selectedComponents?.length) {
        logger.warn("No components were selected. Please try again.");
        process.exit(0);
      }

      // const tree = await resolveTree(registryIndex, selectedComponents);
      // const resolvedPayload = await fetchTree(tree);

      const resolvedPayload = [];

      if (!resolvedPayload.length) {
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
    } catch (error) {
      handleError(error);
    }
  });