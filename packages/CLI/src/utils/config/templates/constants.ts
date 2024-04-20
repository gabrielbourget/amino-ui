export const geometry = `export const ORTHOGONAL = "orthogonal";
export const ROUNDED = "rounded";
export const ROUND = "round";

export const AVAILABLE_CORNER_GEOMETRIES = [ORTHOGONAL, ROUNDED, ROUND];
`;

export const ui = `export const VIEWBOX_CENTER_X = 50;
export const VIEWBOX_CENTER_Y = 50;

export const STROKE_LINECAP__BUTT = "butt";
export const STROKE_LINECAP__ROUND = "round";
export const STROKE_LINECAP__SQUARE = "square";
export const AVAILABLE_STROKE_LINECAPS = [STROKE_LINECAP__BUTT, STROKE_LINECAP__ROUND, STROKE_LINECAP__SQUARE];

export const AVAILABLE_POPOVER_PLACEMENT_POSITIONS = [
  POPOVER_PLACEMENT__BOTTOM, POPOVER_PLACEMENT__BOTTOM_LEFT, POPOVER_PLACEMENT__BOTTOM_RIGHT,
  POPOVER_PLACEMENT__BOTTOM_START, POPOVER_PLACEMENT__BOTTOM_END, POPOVER_PLACEMENT__TOP,
  POPOVER_PLACEMENT__TOP_LEFT, POPOVER_PLACEMENT__TOP_RIGHT, POPOVER_PLACEMENT__TOP_START,
  POPOVER_PLACEMENT__TOP_END, POPOVER_PLACEMENT__LEFT, POPOVER_PLACEMENT__LEFT_TOP,
  POPOVER_PLACEMENT__LEFT_BOTTOM, POPOVER_PLACEMENT__START, POPOVER_PLACEMENT__START_TOP,
  POPOVER_PLACEMENT__START_BOTTOM, POPOVER_PLACEMENT__RIGHT, POPOVER_PLACEMENT__RIGHT_TOP,
  POPOVER_PLACEMENT__RIGHT_BOTTOM, POPOVER_PLACEMENT__END, POPOVER_PLACEMENT__END_TOP,
  POPOVER_PLACEMENT__END_BOTTOM
] as const;
`;

export const theme = `export const THEME__PRIMARY = "primary";
export const THEME__SECONDARY = "secondary";
export const THEME__TERTIARY = "tertiary";
export const THEME__QUATERNARY = "quaternary";
export const THEME__QUINTENARY = "quintenary";

export const AVAILABLE_THEMING_ORDERS = [
  THEME__PRIMARY, THEME__SECONDARY, THEME__TERTIARY, THEME__QUATERNARY, THEME__QUINTENARY,
];

export const THEME__LIGHT = "light";
export const THEME__DARK = "dark";
`;
