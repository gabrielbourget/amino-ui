import { existsSync, promises as fs } from "fs";
import chalk from "chalk";
import path from "path";
import { Command } from "commander";
import { diffLines, type Change } from "diff";
import { z } from "zod";

import { getRegistryIndex, getItemTargetPath, fetchTree } from "@/src/utils/registry";
import { handleError, logger } from "@/src/utils";
import { getConfig } from "@/src/utils/config";
import type { TConfig } from "@/src/utils/config/schema";
import { kebabToPascalCase } from "@/src/utils/stringUtils";
import type { TRegistryIndexItem, TRegistryIndexItemFile, registryIndexSchema } from "../utils/registry/schema";

const updateOptionsSchema = z.object({
  component: z.string().optional(),
  skipConfirmationPrompt: z.boolean(),
  cwd: z.string(),
  path: z.string().optional()
});

export const diff = new Command()
  .name("diff")
  .description("Check for updates to components in the registry.")
  .argument("[component]", "The component you'd like to check for updates.")
  .option("-y, --yes", "Skip the confirmation prompt.", true)
  .option(
    "-c, --cwd <cwd>",
    "The chosen working directory. Defaults to the current directory.",
    process.cwd()
  )
  .action(async (name, CLIOptions) => {
    try {
      const options = updateOptionsSchema.parse({ component: name, ...CLIOptions });
      const cwd = path.resolve(options.cwd);

      if(!existsSync) {
        logger.error(`The path ${cwd} could not be found. Please try again.`);
        process.exit(1);
      }

      const config = await getConfig(cwd);
      if (!config) {
        logger.warn(
          `No existing configuration found. Please run the ${chalk.green(`init`)} command to generate a components.json file.`
        );
        process.exit(1);
      }

      const registryIndex = await getRegistryIndex();

      // -> No component chosen for analysis.
      if (!options.component) {
        const targetPath = config.resolvedPaths.components;

        const componentsInProject = registryIndex.filter((item: TRegistryIndexItem) => {
          for (const component of componentsInProject) {
            const filePath = path.resolve(targetPath, component.name);
            if (existsSync(filePath)) return true;
          };

          return false;
        });

        const componentsWithUpdates = [];
        for (const component of componentsInProject) {
          const changes = await diffComponent(component, config);
          if (changes.length) {
            componentsWithUpdates.push({
              name: component.name,
              changes,
            });
          }
        }

        if (!componentsWithUpdates.length) {
          logger.info("No changes required, your components are up to date.");
          process.exit(0);
        }

        logger.info("The following components have updates available:");
        for (const component of componentsWithUpdates) {
          logger.info(`- ${component.name}`);
          for (const change of component.changes) logger.info(`  - ${change.filePath}`);
        }

        logger.newLine();
        logger.info(`Run ${chalk.green("diff <component>")} to see the relevant changes.`);
        process.exit(0);
      }

      // -> Single component chosen for analysis.
      const component = registryIndex.find((item: TRegistryIndexItem) => item.name === options.component);

      if (!component) {
        logger.error(`The component ${chalk.green(options.component)} does not exist in the registry.`);
        process.exit(1);
      }

      const changes = await diffComponent(component, config);

      if (!changes.length) {
        logger.info("No changes required, the chosen component is up to date.");
        process.exit(0);
      }

      for (const change of changes) {
        logger.info(`- ${change.filePath}`);
        await printDiff(change.patch);
        logger.info("");
      }
    } catch(error) {
      handleError(error);
    }
  });

const diffComponent = async (component: z.infer<typeof registryIndexSchema>[number], config: TConfig) => {
  const payload = await fetchTree([component]);
  
  if (!payload) {
    console.error(`Error encountered while diffing component for changes.`);
    process.exit(1);
  }

  const changes = [];

  for (const item of payload) {
    const targetPath = path.join(await getItemTargetPath(config), kebabToPascalCase(item.name));
    
    if (!targetPath) continue;

    for (const file of item.files) {
      const filePath = path.resolve(targetPath, file.name);

      if (!existsSync(filePath)) continue;

      const fileContent = await fs.readFile(filePath, "utf8");

      // - TODO: Remove stup once code transforms are implemented.
      const registryContent = "";
      // const registryContent = await transform({
      //   filename: file.name,
      //   raw: file.content,
      //   config
      // });

      const patch = diffLines(registryContent as string, fileContent)
      if (patch.length > 1) {
        changes.push({
          file: file.name,
          filePath,
          patch,
        })
      }
    }
  };

  return changes;
};

const printDiff = async (diff: Change[]) => {
  diff.forEach((diffSegment) => {
    if (diffSegment) {
      if (diffSegment.added) return process.stdout.write(chalk.green(diffSegment.value));
      if (diffSegment.removed) return process.stdout.write(chalk.red(diffSegment.value));
      return process.stdout.write(diffSegment.value);
    }
  });
};
