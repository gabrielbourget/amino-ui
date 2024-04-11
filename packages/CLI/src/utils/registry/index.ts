import { HttpsProxyAgent } from "https-proxy-agent"
import { type TRegistryIndex, type TRegistryIndexItem, registryIndexSchema } from "@/src/utils/registry/schema";

const { COMPONENT_REGISTRY_URL, HTTPS_PROXY } = process.env;

// - TODO: -> Replace default URL with actual hosted link once site is setup.
const baseUrl = COMPONENT_REGISTRY_URL ?? "https://wrapper-component-library.com";
const agent = HTTPS_PROXY ? new HttpsProxyAgent(HTTPS_PROXY) : undefined;

export const getRegistryIndex = async (): Promise<TRegistryIndexItem[]> => {
  try {
    const [result] = await fetchRegistry(["index.json"])

    return registryIndexSchema.parse(result)
  } catch (error) {
    throw new Error(`Failed to fetch components from registry -> ${error}`);
  }
};

// - TODO: -> Replace this placeholder type once config features are implemented.
export type TTempConfig = any;

export const getItemTargetPath = async (config: TTempConfig, pathOverride?: string) => {
  if (pathOverride) return pathOverride;

  // - TODO: -> Conditional logic to check for a global path override coming from config.

  // - TODO: -> Check to see if this is sufficient or if an absolute path will be needed.
  return "components";
};

export const fetchRegistry = async (paths: string[]) => {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        // - TODO: -> Figure out how shadcn uses agent here but it doesn't work for me.
        // const response = await fetch(`${baseUrl}/registry/${path}`, { agent });
        const response = await fetch(`${baseUrl}/registry/${path}`);

        return await response.json();
      })
    );

    return results;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`);
  }
};

export const resolveTree = async (index: TRegistryIndex, itemsToResolve: string[]): Promise<TRegistryIndex> => {
  const tree: TRegistryIndex = [];

  for (const item of itemsToResolve) {
    const entry = index.find((entry: TRegistryIndexItem) => entry.name === item);

    if (!entry) continue;

    tree.push(entry);

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }

  }
  return tree.filter(
    (entry: TRegistryIndexItem, index: number, self: TRegistryIndex) =>
      self.findIndex((e: TRegistryIndexItem) => e.name === entry.name) === index
  );
};

export const fetchTree = async (tree: TRegistryIndex) => {
  try {
    const paths = tree.map((entry: TRegistryIndexItem) => `${entry.name}.json`);
    const result = await fetchRegistry(paths);

    return registryIndexSchema.parse(result);
  } catch (error) {
    console.error(`Error encountered while fetching import tree from the registry -> ${error}`);
  }
};
