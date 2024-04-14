// - TODO: -> Figure out how to include default icons

import { existsSync, promises as fs } from "fs";
import { Command } from "commander";
import path from "path";
import { z } from "zod";

import { handleError } from "@/src/utils/handleError";
import { logger } from "@/src/utils/logger";
import { getProjectConfig } from "@/src/utils/getProjectInfo";
import {
  DEFAULT_COMPONENTS_PATH, DEFAULT_CONSTANTS_PATH, DEFAULT_CSS_PATH, DEFAULT_ICONS_PATH, DEFAULT_TYPES_PATH, DEFAULT_UTILS_PATH, getConfig,
  resolveConfigPaths
} from "@/src/utils/config";
import chalk from "chalk";
import { coreConfigSchema, type TConfig, type TCoreConfig } from "../utils/config/schema";
import prompts from "prompts";
import ora from "ora";

// - TODO: -> Figure out what's in this list.
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

      const projectConfig = await getProjectConfig(cwd);

      if (projectConfig) {
        // const config = await promptForMinimalConfig(cwd, projectConfig, options.defaults);
        // await runInit(cwd, config);
        // - TODO: -> Consider edge case where there is an existing config but you'd like to modify it through the command line interface.
      }
      
      else {
        const existingConfig = await getConfig(cwd)
        const config = await promptForConfig(cwd, existingConfig, options.skipConfirmationPrompt);
        await runInit(cwd, config)
      }

      logger.newLine();
      logger.info(`
        ${chalk.green("[ Success ]")} Project initialization successfully concluded.
        You may now proceed with adding components to your project.
      `);
      logger.newLine();
    } catch (error) {
      handleError(error);
    }
  });

export const promptForConfig = async (
  cwd: string, defaultConfig: TConfig | null = null, skip = false
): Promise<TConfig> => {
  const highlight = (text: string) => chalk.green(text);

  const options = await prompts([
    {
      type: "toggle",
      name: "rsc",
      message: `Would you like to use ${highlight("React Server Components")}?`,
      initial: defaultConfig?.rsc ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "tsx",
      message: `Would you like to use ${highlight("TypeScript")}? (recommended)`,
      initial: defaultConfig?.tsx ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "componentsAlias",
      message: `Please configure your preferred import alias for ${highlight("components")}:`,
      initial: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS_PATH,
    },
    {
      type: "text",
      name: "utilsAlias",
      message: `Please configure your preferred import alias for ${highlight("utils")}:`,
      initial: defaultConfig?.aliases.utils ?? DEFAULT_UTILS_PATH,
    },
    {
      type: "text",
      name: "typesAlias",
      message: `Please configure your preferred import alias for ${highlight("types")}:`,
      initial: defaultConfig?.aliases.types ?? DEFAULT_TYPES_PATH,
    },
    {
      type: "text",
      name: "constantsAlias",
      message: `Please configure your preferred import alias for ${highlight("icons")}:`,
      initial: defaultConfig?.aliases.constants ?? DEFAULT_CONSTANTS_PATH,
    },
    {
      type: "text",
      name: "iconsAlias",
      message: `Please configure your preferred import alias for ${highlight("icons")}:`,
      initial: defaultConfig?.aliases.icons ?? DEFAULT_ICONS_PATH,
    },
    {
      type: "text",
      name: "globalCSSAlias",
      message: `Where is your ${highlight("global CSS")} file?`,
      initial: defaultConfig?.aliases.globalCSS ?? DEFAULT_CSS_PATH,
    },
  ]);

  const config = coreConfigSchema.parse({
    "$schema": "https://wrapper-component-library.com/schema.json",
    rsc: options.rsc,
    tsx: options.tsx,
    aliases: {
      components: options.componentsAlias,
      utils: options.utilsAlias,
      types: options.typesAlias,
      constants: options.constantsAlias,
      icons: options.iconsAlias,
      globalCSS: options.globalCSSAlias,
    }
  });

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Configuration will be written to ${highlight("components.json")}. Proceed?`,
      initial: true,
    });

    if (!proceed) process.exit(0);
  }


  logger.newLine();
  const spinner = ora(`Writing configuration details to components.json...`).start()
  const targetPath = path.resolve(cwd, "components.json")
  await fs.writeFile(targetPath, JSON.stringify(config, null, 3), "utf8")
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
};

export const runInit = async (cwd: string, config: TConfig) => {

  
};
