import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { logger, handleError } from "@/src/utils";
import { z } from "zod";

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  skipConfirmationPrompt: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  addAllComponents: z.boolean(),
  path: z.string().optional()
});

export const add = new Command()
  .name("add")
  .description("Add one or more components to your project.")
  .argument("[components...]", "The components you'd like to add.")
  .option("-y, --yes", "Skip the confirmation prompt.", true)
  .option("-o, --overwrite", "Overwrite existing files.", false)
  .option(
    "c, --cwd <cwd>",
    "The working directory. Defaults to the current directory.",
    process.cwd()
  )
  .option("a, --all", "Add all available components to your project.", false)
  .option("p, --path <path>", "The path to where components should be added.", "components")
  .action(async (components, options) => {
    
  });