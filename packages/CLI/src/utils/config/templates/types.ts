export const geometry = `import {
  AVAILABLE_CORNER_GEOMETRIES, AVAILABLE_POPOVER_PLACEMENT_POSITIONS
} from "@/src/constants/geometryConstants";

export type TAvailableCornerGeometries = typeof AVAILABLE_CORNER_GEOMETRIES[number];
`;

export const accessibility = `export type TAriaLabelingProps = {
  "aria-label"?: string,
  "aria-labelledby"?: string,
  "aria-describedby"?: string,
  "aria-details"?: string
}
`;

export const theme = `import { AVAILABLE_THEMING_ORDERS } from "@src/constants/theme";

export type TAvailableThemingOrders = typeof AVAILABLE_THEMING_ORDERS[number];
`;

export const ui = `import { AVAILABLE_STROKE_LINECAPS, AVAILABLE_POPOVER_PLACEMENT_POSITIONS } from "@src/constants/ui";

export type TAvailablePopoverPlacementPositions = typeof AVAILABLE_POPOVER_PLACEMENT_POSITIONS[number];

export type TAvailableStrokeLinecaps = typeof AVAILABLE_STROKE_LINECAPS[number];
`;

export const utils = `export type TIntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
`;
