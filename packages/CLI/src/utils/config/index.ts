import path from "path"
import { loadConfig } from "tsconfig-paths";
import { cosmiconfig } from "cosmiconfig";
import { resolveImport } from "@/src/utils/resolveImport";
import { type TConfig, coreConfigSchema, type TCoreConfig, configSchema } from "@/src/utils/config/schema";

export const DEFAULT_COMPONENTS_PATH = "@/components";
export const DEFAULT_UTILS_PATH = "@/utils";
export const DEFAULT_TYPES_PATH = "@/types";
export const DEFAULT_CONSTANTS_PATH = "@/constants";
export const DEFAULT_ICONS_PATH = "@/icons";
// - TODO: -> Merge globals.css, variables.css, and utils.css into one css file.
export const DEFAULT_GLOBAL_CSS_PATH = "@/";

export const getConfig = async (cwd: string) => {
  const config = await getCoreConfig(cwd);

  if (!config) return null;

  return await resolveConfigPaths(cwd, config);
};

export const resolveConfigPaths = async (cwd: string, config: TCoreConfig): Promise<TConfig> => {
  const tsConfig = loadConfig(cwd);

  if(tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${tsConfig.message ?? ""}`.trim()
    );
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      components: await resolveImport(config.aliases["components"], tsConfig),
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      types: await resolveImport(config.aliases["types"], tsConfig),
      constants: await resolveImport(config.aliases["constants"], tsConfig),
      globalStyles: await resolveImport(config.aliases["globalStyles"], tsConfig),
    }
  });
};

export const getCoreConfig = async (cwd: string): Promise<TCoreConfig | undefined> => {
  try {
    const explorer = cosmiconfig("components", { searchPlaces: ["components.json"] });
    const configResult = await explorer.search(cwd);

    if (!configResult) return undefined;

    return coreConfigSchema.parse(configResult.config);
  } catch (error) {
    console.log(`Error encountered while retrieving config -> ${error}`);
  }
};
