import { z } from "zod";

export const componentRegistryEntrySchema = z.object({
  name: z.string(),
  isIcon: z.boolean(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  componentRegistryDependencies: z.array(z.string()).optional(),
  directory: z.string(),
});

export type TRegistryEntry = z.infer<typeof componentRegistrySchema>;

export const componentRegistrySchema = z.array(componentRegistryEntrySchema);

export type TRegistry = z.infer<typeof componentRegistrySchema>;
