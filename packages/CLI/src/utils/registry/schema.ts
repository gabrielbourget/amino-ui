import { type ZodType, z } from "zod";

export const REGISTRY_TYPE__COMPONENTS = "components";
export const REGISTRY_TYPE__HELPERS = "helpers";
export const AVAILABLE_REGISTRY_TYPES = [REGISTRY_TYPE__COMPONENTS, REGISTRY_TYPE__HELPERS] as const;
export type TAvailableRegistryTypes = typeof AVAILABLE_REGISTRY_TYPES[number];

export const REGISTRY_ITEM_TYPE__COMPONENT = "components";
export const REGISTRY_ITEM_TYPE__ICON = "icons";
export const REGISTRY_ITEM_TYPE__UTIL = "utils";
export const REGISTRY_ITEM_TYPE__TYPE = "types";
export const REGISTRY_ITEM_TYPE__CONSTANT = "constants";
export const REGISTRY_ITEM_TYPE__GLOBAL_CSS = "globalCSS";
export const REGISTRY_ITEM_TYPE__TEXT_CSS = "textCSS";
export const AVAILABLE_REGISTRY_ITEM_TYPES = [
  REGISTRY_ITEM_TYPE__COMPONENT, REGISTRY_ITEM_TYPE__ICON, REGISTRY_ITEM_TYPE__UTIL,
  REGISTRY_ITEM_TYPE__CONSTANT, REGISTRY_ITEM_TYPE__TYPE, REGISTRY_ITEM_TYPE__GLOBAL_CSS, REGISTRY_ITEM_TYPE__TEXT_CSS
];
export type TAvailableRegistryItemTypes = typeof AVAILABLE_REGISTRY_ITEM_TYPES[number];
export const availableRegistryItemTypeSchema = z.union([
  z.literal(REGISTRY_ITEM_TYPE__COMPONENT), z.literal(REGISTRY_ITEM_TYPE__ICON), z.literal(REGISTRY_ITEM_TYPE__UTIL),
  z.literal(REGISTRY_ITEM_TYPE__CONSTANT), z.literal(REGISTRY_ITEM_TYPE__TYPE), z.literal(REGISTRY_ITEM_TYPE__GLOBAL_CSS),
  z.literal(REGISTRY_ITEM_TYPE__TEXT_CSS)
]);

export type THelperRegistryIndexKeymap = {
  [REGISTRY_ITEM_TYPE__COMPONENT]: string;
  [REGISTRY_ITEM_TYPE__UTIL]: string;
  [REGISTRY_ITEM_TYPE__TYPE]: string;
  [REGISTRY_ITEM_TYPE__GLOBAL_CSS]: string;
  [REGISTRY_ITEM_TYPE__TEXT_CSS]: string;
}

export const helpersRegistryIndexItemKeymap: THelperRegistryIndexKeymap = {
  [REGISTRY_ITEM_TYPE__COMPONENT]: REGISTRY_ITEM_TYPE__COMPONENT,
  [REGISTRY_ITEM_TYPE__UTIL]: REGISTRY_ITEM_TYPE__UTIL,
  [REGISTRY_ITEM_TYPE__TYPE]: REGISTRY_ITEM_TYPE__TYPE,
  [REGISTRY_ITEM_TYPE__GLOBAL_CSS]: REGISTRY_ITEM_TYPE__GLOBAL_CSS,
  [REGISTRY_ITEM_TYPE__TEXT_CSS]: REGISTRY_ITEM_TYPE__TEXT_CSS
};

export type TRegistryIndexItemFile = {
  name: string;
  content: string;
};

export type TRegistryIndexItemDirectory = {
  name: string;
  content: (TRegistryIndexItemFile | TRegistryIndexItemDirectory)[];
};

const registryIndexItemFileSchema = z.object({
  name: z.string(),
  pathSegment: z.string(),
  content: z.string()
});

const registryIndexItemDirectorySchema: ZodType<TRegistryIndexItemDirectory> = z.lazy(() =>
  z.object({
    name: z.string(),
    content: z.array(
      z.union([registryIndexItemFileSchema, registryIndexItemDirectorySchema])
    )
  })
);

export { registryIndexItemDirectorySchema };


export type TIndexItemFile = z.infer<typeof registryIndexItemFileSchema>;

export const componentRegistryIndexItemSchema = z.object({
  name: z.string(),
  isIcon: z.boolean(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  componentRegistryDependencies: z.array(z.string()).optional(),
  helpersRegistryDependencies: z.array(z.string()).optional(),
  directory: registryIndexItemDirectorySchema,
});

export type TComponentRegistryIndexItem = z.infer<typeof componentRegistryIndexItemSchema>;

export const componentRegistryIndexSchema = z.array(componentRegistryIndexItemSchema);

export type TComponentRegistryIndex = z.infer<typeof componentRegistryIndexSchema>;

export const helperRegistryIndexItemSchema = z.object({
  name: z.string(),
  type: availableRegistryItemTypeSchema,
  file: registryIndexItemFileSchema
});

export type THelperRegistryIndexItem = z.infer<typeof helperRegistryIndexItemSchema>;

export const helperRegistryIndexSchema = z.array(helperRegistryIndexItemSchema);

export type THelpersRegistryIndex = z.infer<typeof helperRegistryIndexSchema>;
