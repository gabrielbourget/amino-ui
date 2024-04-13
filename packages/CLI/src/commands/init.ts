// - TODO: -> Figure out how to include default icons

import { existsSync } from "fs";
import { Command } from "commander";
import path from "path";
import { z } from "zod";

import { handleError } from "@/src/utils/handleError";
import { logger } from "@/src/utils/logger";

const BASE_COMPONENT_LIBRARY_DEPENDENCIES = [];

const initOptionsSchema = z.object({
  cwd: z.string(),
  skipConfirmationPrompt: z.boolean(),
  defaults: z.boolean(),
});

export const init = new Command()
  .name("init")
  .description("Initialize and configure your repository to use components from this library.")
  .option(
    "-c, --cwd <cwd>",
    "The chosen working directory. Defaults to the current directory.",
    process.cwd()
  )
  .option("-y, --yes", "Skip the confirmation prompt.", true)
  .option("-d, --defaults", "Use the default component library configuration.", false)
  .action(async (CLIOptions) => {
    try {
      const options = initOptionsSchema.parse(CLIOptions);
      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} could not be found. Please try again.`);
        process.exit(1);
      }

      // const projectConfig = await getProjectConfig(cwd)
      // if (projectConfig) {
      //   const config = await promptForMinimalConfig(
      //     cwd,
      //     projectConfig,
      //     options.defaults
      //   )
      //   await runInit(cwd, config)
      // } else {
      //   // Read config.
      //   const existingConfig = await getConfig(cwd)
      //   const config = await promptForConfig(cwd, existingConfig, options.yes)
      //   await runInit(cwd, config)
      // }
    } catch (error) {
      handleError(error);
    }
  });
