// - TODO: -> Figure out how to include default icons

import { existsSync, promises as fs } from "fs";
import { Command } from "commander";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import ora from "ora";
import { z } from "zod";

import { handleError } from "@/src/utils/handleError";
import { logger } from "@/src/utils/logger";
import * as constantTemplates from "@/src/utils/config/templates/constants";
import * as typeTemplates from "@/src/utils/config/templates/types";
import * as utilTemplates from "@/src/utils/config/templates/utils";
import * as iconTemplates from "@/src/utils/config/templates/icons";
import globalCSSTemplate from "@/src/utils/config/templates/globalCSS";
import textCSSTemplate from "@/src/utils/config/templates/textCSS";
import { getProjectConfig } from "@/src/utils/getProjectInfo";
import {
  DEFAULT_COMPONENTS_PATH, DEFAULT_CONSTANTS_PATH, DEFAULT_ICONS_PATH, DEFAULT_TYPES_PATH, DEFAULT_UTILS_PATH, getConfig,
  resolveConfigPaths, DEFAULT_GLOBAL_CSS_PATH, DEFAULT_TEXT_CSS_PATH
} from "@/src/utils/config";
import { coreConfigSchema, type TConfig, type TCoreConfig } from "../utils/config/schema";

// - TODO: -> Figure out what's in this list.
const BASE_COMPONENT_LIBRARY_DEPENDENCIES = [
  "react", "react-dom", "classnames",
];

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
      initial: defaultConfig?.aliases.globalCSS ?? DEFAULT_GLOBAL_CSS_PATH,
    },
    {
      type: "text",
      name: "textCSSAlias",
      message: `Where would you like to place the common ${highlight("text CSS")} file?`,
      initial: defaultConfig?.aliases.globalCSS ?? DEFAULT_TEXT_CSS_PATH,
    },
  ]);

  const config = coreConfigSchema.parse({
    "$schema": "https://aminoui.com/schema.json",
    rsc: options.rsc,
    tsx: options.tsx,
    aliases: {
      components: options.componentsAlias,
      utils: options.utilsAlias,
      types: options.typesAlias,
      constants: options.constantsAlias,
      icons: options.iconsAlias,
      globalCSS: options.globalCSSAlias,
      textCSS: options.textCSSAlias,
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
  const spinner = ora(`Writing configuration details to amino-components.json...`).start();
  // - TODO: -> Consider exposing the config file name and type to the CLI so the user can customize.
  const targetPath = path.resolve(cwd, "amino-components.json");
  await fs.writeFile(targetPath, JSON.stringify(config, null, 3), "utf8");
  spinner.succeed();

  return await resolveConfigPaths(cwd, config);
};

export const runInit = async (cwd: string, config: TConfig) => {
  const spinner = ora(`Initializing project...`).start();

  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    let dirName = (path.extname(resolvedPath) === "") ? resolvedPath : path.dirname(resolvedPath);
    if (!existsSync(dirName)) await fs.mkdir(dirName, { recursive: true });
  }

  const targetJSXTSXFileExtension = config.tsx ? "tsx" : "jsx";
  const targetJSTSFileExtension = config.tsx ? "ts" : "js";

  // - TODO: -> Run imports code transform before writing files to calibrate imports to config file
  //   aliases in the user's codebase.

  // -> Write  to util files
  // - TODO: -> Handle existing files by appending to them.
  // await fs.writeFile(
  //   config.resolvedPaths.utils,
  // )

  // await fs.writeFile(
  //   config.resolvedPaths.tailwindConfig,
  //   template(tailwindConfigTemplate)({
  //     extension,
  //     prefix: config.tailwind.prefix,
  //   }),
  //   "utf8"
  // )
  // -> Write types file
  // -> Write constants files 게
  // -> Write icons files
  // -> Write global CSS file
};
