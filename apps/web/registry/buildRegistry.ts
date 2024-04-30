import { existsSync, promises as fs } from "fs";
import path from "path";
import { TComponentRegistryIndexItem, THelperRegistryIndexItem, TRegistryIndexItemDirectory, TRegistryIndexItemFile } from "./schema";
import { TComponentRegistry, TComponentRegistryEntry } from "./components/schema";
import { THelperRegistry } from "./helpers/schema";

const REGISTRY_PATH = path.join(process.cwd(), "public/registry")

export const processComponentDirectoryIntoRegistry =
  async (directoryPath: string): Promise<TRegistryIndexItemDirectory> => {
  
  const files = await fs.readdir(directoryPath);
  const directoryContent: (TRegistryIndexItemFile | TRegistryIndexItemDirectory)[] = [];

  files.forEach(async (file) => {
    const filePath = path.join(directoryPath, file);
    const fileInfo = await fs.stat(filePath);

    if (fileInfo.isDirectory()) {
      const subDirectory = await processComponentDirectoryIntoRegistry(filePath);
      directoryContent.push(subDirectory);
    } else {
      const content = await fs.readFile(filePath, "utf-8");
      const pathSegment = path.relative(directoryPath, filePath);
      directoryContent.push({ name: file, pathSegment, content });
    }
  });

  return { name: path.basename(directoryPath), content: directoryContent };
};

export const buildComponentRegistryIndexItems = async (registry: TComponentRegistry): Promise<void> => {
  const targetPath = path.join(REGISTRY_PATH, "components");
  if (!existsSync(targetPath)) await fs.mkdir(targetPath, { recursive: true });

  for (const entry of registry) {
    const indexItemInfo: TComponentRegistryIndexItem = {
      name: entry.name,
      isIcon: entry.isIcon,
      dependencies: entry.dependencies,
      devDependencies: entry.devDependencies,
      componentRegistryDependencies: entry.componentRegistryDependencies,
      helperRegistryDependencies: entry.helperRegistryDependencies,
      directory: (entry.isIcon) ? undefined : await processComponentDirectoryIntoRegistry(entry.directory!),
      file: (entry.isIcon) ? entry.file : undefined
    };

    await fs.writeFile(path.join(targetPath, `${entry.directory}.json`), JSON.stringify(indexItemInfo, null, 2), "utf-8");
  }
};

export const buildHelperRegistryIndexItems = async (registry: THelperRegistry): Promise<void> => {
  const targetPath = path.join(REGISTRY_PATH, "helpers");
  if (!existsSync(targetPath)) await fs.mkdir(targetPath, { recursive: true });

  for (const entry of registry) {
    const indexItemInfo: THelperRegistryIndexItem = {
      name: entry.name,
      type: entry.type,
      file: {
        name: entry.file,
        content: await fs.readFile(path.join(targetPath, entry.file), "utf-8")
      }
    };
  }
}
