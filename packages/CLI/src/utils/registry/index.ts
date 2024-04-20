import { HttpsProxyAgent } from "https-proxy-agent"
import {
  type TComponentRegistryIndex, type TComponentRegistryIndexItem, componentRegistryIndexSchema,
  helpersRegistryIndexItemSchema, helpersRegistryIndexSchema, THelpersRegistryIndex,
  THelpersRegistryIndexItem,
  REGISTRY_TYPE__COMPONENTS,
  TAvailableRegistryItemTypes,
  REGISTRY_ITEM_TYPE__COMPONENT,
  REGISTRY_ITEM_TYPE__UTIL,
  REGISTRY_ITEM_TYPE__TYPE, helpersRegistryIndexItemKeymap, 
  REGISTRY_ITEM_TYPE__GLOBAL_CSS,
  REGISTRY_ITEM_TYPE__TEXT_CSS,
  TAvailableRegistryTypes,
  REGISTRY_TYPE__HELPERS,
  REGISTRY_ITEM_TYPE__ICON
} from "@/src/utils/registry/schema";
import { TConfig } from "@/src/utils/config/schema";

const { COMPONENT_REGISTRY_URL, HTTPS_PROXY } = process.env;

// - TODO: -> Replace default URL with actual hosted link once site is setup.
const baseUrl = COMPONENT_REGISTRY_URL ?? "https://aminoui.com";
const agent = HTTPS_PROXY ? new HttpsProxyAgent(HTTPS_PROXY) : undefined;

export const getRegistryIndex = async (
  { registryType }: { registryType: TAvailableRegistryTypes }
): Promise<TComponentRegistryIndex | THelpersRegistryIndex> => {
  let registryIndex: TComponentRegistryIndex | THelpersRegistryIndex = [];
  try {
    if (registryType === REGISTRY_TYPE__COMPONENTS) {
      const [result] = await fetchRegistry(["index.json"], { registryType: REGISTRY_TYPE__COMPONENTS });
      registryIndex = componentRegistryIndexSchema.parse(result);
    }
    else if (registryType === REGISTRY_TYPE__HELPERS) {
      const [result] = await fetchRegistry(["helpers/index.json"], { registryType: REGISTRY_TYPE__HELPERS });
      registryIndex = helpersRegistryIndexSchema.parse(result);
    }

    return registryIndex;
  } catch (error) {
    throw new Error(`Failed to fetch components from registry -> ${error}`);
  }
};

export const getItemTargetPath = async (
  config: TConfig, itemType: TAvailableRegistryItemTypes, pathOverride?: string
) => {
  if (pathOverride) return pathOverride;

  switch (itemType) {
    case REGISTRY_ITEM_TYPE__COMPONENT: return config.resolvedPaths[REGISTRY_ITEM_TYPE__COMPONENT];
    case REGISTRY_ITEM_TYPE__ICON: return config.resolvedPaths[REGISTRY_ITEM_TYPE__ICON];
    case REGISTRY_ITEM_TYPE__UTIL: return config.resolvedPaths[REGISTRY_ITEM_TYPE__UTIL];
    case REGISTRY_ITEM_TYPE__TYPE: return config.resolvedPaths[REGISTRY_ITEM_TYPE__TYPE];
    case REGISTRY_ITEM_TYPE__GLOBAL_CSS: return config.resolvedPaths[REGISTRY_ITEM_TYPE__GLOBAL_CSS];
    case REGISTRY_ITEM_TYPE__TEXT_CSS: return config.resolvedPaths[REGISTRY_ITEM_TYPE__TEXT_CSS];
  }
};

export const fetchRegistry = async (
  paths: string[], { registryType }: { registryType: TAvailableRegistryTypes }
) => {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        if (registryType === REGISTRY_TYPE__COMPONENTS) {
          // - TODO: -> Figure out how shadcn uses agent here but it doesn't work for me.
          // const response = await fetch(`${baseUrl}/registry/${path}`, { agent });
          const response = await fetch(`${baseUrl}/registry/components/${path}`);
          return await response.json();
        }
        else if (registryType === REGISTRY_TYPE__HELPERS) {
          const response = await fetch(`${baseUrl}/registry/helpers/${path}`);
          return await response.json();
        }
      })
    );

    return results;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`);
  }
};

export const resolveComponentTree = async (
  index: TComponentRegistryIndex, itemsToResolve: string[]
): Promise<TComponentRegistryIndex> => {
  const tree: TComponentRegistryIndex = [];

  for (const item of itemsToResolve) {
    const entry = index.find((entry: TComponentRegistryIndexItem) => entry.name === item);

    if (!entry) continue;

    tree.push(entry);

    if (entry.componentRegistryDependencies) {
      const dependencies = await resolveComponentTree(index, entry.componentRegistryDependencies);
      tree.push(...dependencies);
    }
  }

  // -> Filter out duplicates
  return tree.filter(
    (entry: TComponentRegistryIndexItem, index: number, self: TComponentRegistryIndex) =>
      self.findIndex((e: TComponentRegistryIndexItem) => e.name === entry.name) === index
  );
};

export const resolveHelperTree = async (
  index: THelpersRegistryIndex,
  { registryType, itemsToResolve }: { registryType: TAvailableRegistryTypes, itemsToResolve: string[] }
): Promise<THelpersRegistryIndex> => {
  const tree: THelpersRegistryIndex = [];

  for (const item of itemsToResolve) {
    const entry = index.find((entry: THelpersRegistryIndexItem) => entry.name === item);

    if (!entry) continue;
    tree.push(entry);
  }

  // -> Filter out duplicates
  return tree.filter(
    (entry: THelpersRegistryIndexItem, index: number, self: THelpersRegistryIndex) =>
      self.findIndex((e: THelpersRegistryIndexItem) => e.name === entry.name) === index
  );
};

// - TODO: -> Somehow need to account for recursion through nested directory structures, and maintain that directory structure
//            to recreate it on the user's machine who's using the CLI.
export const fetchComponentTree = async (
  tree: TComponentRegistryIndex, { registryType }: { registryType: TAvailableRegistryTypes }
) => {
  try {
    const paths = tree.map((entry: TComponentRegistryIndexItem) => `${entry.name}.json`);
    const result = await fetchRegistry(paths, { registryType });

    return componentRegistryIndexSchema.parse(result);
  } catch (error) {
    console.error(`Error encountered while fetching import tree from the component registry -> ${error}`);
  }
};

export const fetchHelperTree = async (
  tree: THelpersRegistryIndex, { registryType }: { registryType: TAvailableRegistryTypes }
) => {
  try {
    const paths = tree.map((entry: THelpersRegistryIndexItem) => `${entry.name}.json`);
    const result = await fetchRegistry(paths, { registryType });

    return helpersRegistryIndexSchema.parse(result);
  } catch (error) {
    console.error(`Error encountered while fetching import tree from the helpers registry -> ${error}`);
  }
};
