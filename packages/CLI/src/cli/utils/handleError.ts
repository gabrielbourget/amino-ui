import { logger } from "@/packages/CLI/src/cli/utils";

export function handleError(error: unknown) {
  if (typeof error === "string") {
    logger.error(error);
    process.exit(1);
  }

  if (error instanceof Error) {
    logger.error(error.message);
    process.exit(1);
  }

  logger.error("Something went wrong, please try again.");
  process.exit(1);
};
