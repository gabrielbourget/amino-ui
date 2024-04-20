import type { THelperRegistry } from "./schema";

export const helpers: THelperRegistry = [
  {
    name: "utils/data",
    type: "utils",
    file: "data.ts"
  },
  {
    name: "constants/geometry",
    type: "constants",
    file: "geometry.ts"
  },
  {
    name: "constants/ui",
    type: "constants",
    file: "ui.ts"
  },
  {
    name: "constants/theme",
    type: "constants",
    file: "theme.ts"
  },
  {
    name: "types/geometry",
    type: "types",
    file: "geometry.ts"
  },
  {
    name: "types/accessibility",
    type: "utils",
    file: "accessibility.ts"
  },
  {
    name: "types/theme",
    type: "types",
    file: "theme.ts"
  },
  {
    name: "types/ui",
    type: "types",
    file: "ui.ts"
  },
  {
    name: "types/utils",
    type: "types",
    file: "utils.ts"
  },
  {
    name: "globalCSS",
    type: "globalCSS",
    file: "globals.css"
  },
  {
    name: "textCSS",
    type: "utils",
    file: "TextStyles.module.scss"
  },
];
