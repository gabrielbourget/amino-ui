import { existsSync } from "fs";
import fs, { pathExists } from "fs-extra";
import fg from "fast-glob";
import path from "path";
import { loadConfig } from "tsconfig-paths";
import { z } from "zod";

import { handleError } from "@/src/utils/handleError";
import { logger } from "@/src/utils/logger";
import { getConfig, resolveConfigPaths } from "@/src/utils/config";
import type { TConfig, TCoreConfig } from "@/src/utils/config/schema";

export const PROJECT_TYPE__NEXT_APP_SRC = "next-app-src";
export const PROJECT_TYPE__NEXT_APP = "next-app";
export const PROJECT_TYPE__NEXT_PAGES_SRC = "next-pages-src";
export const PROJECT_TYPE__NEXT_PAGES = "next-pages";

// - TODO: -> Expand beyond NextJS to support vanilla React, Remix, etc.
export const SUPPORTED_PROJECT_TYPES = [
  PROJECT_TYPE__NEXT_APP_SRC, PROJECT_TYPE__NEXT_APP, PROJECT_TYPE__NEXT_PAGES_SRC, PROJECT_TYPE__NEXT_PAGES
] as const;

export type TSupportedProjectTypes = typeof SUPPORTED_PROJECT_TYPES[number];

const SHARED_IGNORE = [
  "**/node_modules/**", ".next", "dist", "build", "public", "coverage",
  "tests", "test", "spec", "specs", "mocks", "mock", ".husky",
];

export const getProjectInfo = async () => {
  const projectInfo = {
    tsconfig: null,
    srcDir: false,
    appDir: false,
    srcComponentsDir: false,
    componentsDir: false,
  };

  try {
    const tsconfig = await getTsConfig();

    return {
      tsconfig,
      srcDir: existsSync(path.resolve("./src")),
      appDir: existsSync(path.resolve("./app")) || existsSync(path.resolve("./src/app")),
      srcComponentsUiDir: existsSync(path.resolve("./src/components")),
      componentsUiDir: existsSync(path.resolve("./components"))
    };
  } catch (error) {
    return projectInfo;
  }
};

export const getTsConfig = async () => {
  try {
    const tsconfigPath = path.join("tsconfig.json");
    const tsconfig = await fs.readJSON(tsconfigPath);

    if (!tsconfig) throw new Error("tsconfig.json is missing from the chosen working directory.");

    return tsconfig;
  } catch (error) {
    return null;
  }
};

export const getProjectType = async (cwd: string): Promise<TSupportedProjectTypes | null> => {
  const files = await fg.glob("**/*", { cwd, deep: 5, ignore: SHARED_IGNORE });

  const isNextProject = files.find((file) => file.startsWith("next.config."))

  // - TODO: -> Expand beyond NextJS to support vanilla React, Remix, etc.
  if (!isNextProject) return null;

  const isUsingSrcDir = await fs.pathExists(path.resolve(cwd, "src"));
  const isUsingAppDir = await fs.pathExists(path.resolve(cwd, `${isUsingSrcDir ? "src/" : ""}app`));

  if (isUsingAppDir) return isUsingSrcDir ? PROJECT_TYPE__NEXT_APP_SRC : PROJECT_TYPE__NEXT_APP
  return isUsingSrcDir ? PROJECT_TYPE__NEXT_PAGES_SRC : PROJECT_TYPE__NEXT_PAGES;
};

export const getTsConfigAliasPrefix = async (cwd: string) => {
  const tsConfig = loadConfig(cwd);
  const isUsingSrcDir = await fs.pathExists(path.resolve(cwd, "src"));

  if (tsConfig?.resultType === "failed" || !tsConfig?.paths) return null;

  // -> This assumes that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (isUsingSrcDir) {
      if (paths.includes("./src/*")) return alias.at(0);
    }

    else if (paths.includes("./*")) return alias.at(0);
  }

  return null;
};

export const isTypeScriptProject = async (cwd: string) => pathExists(path.resolve(cwd, "tsconfig.json"));
