import { z } from "zod";

export const registryIndexItemFileSchema = z.object({
  name: z.string(),
  content: z.string()
});

export type TRegistryIndexItemFile = z.infer<typeof registryIndexItemFileSchema>;

export const registryIndexItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  directory: z.array(z.string()),
  files: z.object({
    name: z.string(),
    content: z.string()
  })
});

export type TRegistryIndexItem = z.infer<typeof registryIndexItemSchema>;

export const registryIndexSchema = z.array(registryIndexItemSchema);

export type TRegistryIndex = z.infer<typeof registryIndexSchema>;
