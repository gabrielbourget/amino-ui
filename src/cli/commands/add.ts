import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { logger, handleError } from "@/src/cli/utils";