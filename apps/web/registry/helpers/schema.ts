import { z } from "zod";

export const REGISTRY_ITEM_TYPE__UTIL = "utils";
export const REGISTRY_ITEM_TYPE__TYPE = "types";
export const REGISTRY_ITEM_TYPE__CONSTANT = "constants";
export const REGISTRY_ITEM_TYPE__GLOBAL_CSS = "globalCSS";
export const REGISTRY_ITEM_TYPE__TEXT_CSS = "textCSS";
export const AVAILABLE_REGISTRY_ITEM_TYPES = [
  REGISTRY_ITEM_TYPE__UTIL, REGISTRY_ITEM_TYPE__TYPE,
  REGISTRY_ITEM_TYPE__GLOBAL_CSS, REGISTRY_ITEM_TYPE__TEXT_CSS
];
export type TAvailableRegistryItemTypes = typeof AVAILABLE_REGISTRY_ITEM_TYPES[number];
export const availableRegistryItemTypeSchema = z.union([
  z.literal(REGISTRY_ITEM_TYPE__UTIL), z.literal(REGISTRY_ITEM_TYPE__TYPE),
  z.literal(REGISTRY_ITEM_TYPE__CONSTANT), z.literal(REGISTRY_ITEM_TYPE__GLOBAL_CSS),
  z.literal(REGISTRY_ITEM_TYPE__TEXT_CSS)
]);

export const helperRegistryEntrySchema = z.object({
  name: z.string(),
  type: availableRegistryItemTypeSchema,
  file: z.string()
});

export type THelperRegistryEntry = z.infer<typeof helperRegistryEntrySchema>;

export const helperRegistrySchema = z.array(helperRegistryEntrySchema);

export type THelperRegistry = z.infer<typeof helperRegistrySchema>;
