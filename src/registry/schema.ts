import { z } from "zod"

export const registryEntrySchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  directories: z.array(z.string()),
})

export const registrySchema = z.array(registryEntrySchema)

export type TRegistryEntry = z.infer<typeof registryEntrySchema>

export type TRegistry = z.infer<typeof registrySchema>
