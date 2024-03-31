import { Command } from "commander";
// import figlet from "figlet";
import { getPackageInfo } from "./cli/utils";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

(async () => {
  const packageInfo = getPackageInfo();
  
  const program = new Command()
    .name("wrapper-component-library-cli")
    .description("Add components and their dependencies directly into your project as needed.")
    .version(
      packageInfo.version!,
      "-v, --version",
      "Display the version number."
    );

  program.parse();
})();
