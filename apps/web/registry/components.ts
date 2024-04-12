import type { TRegistry } from "./schema";

const baseDependencies = ["react", "react-dom", "classnames"];

export const components: TRegistry = [
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "accordion",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "Accordion",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "action-sheet",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "ActionSheet",
  // },
  {
    name: "alert-dialog",
    dependencies: ["react-aria-components"],
    registryDependencies: ["text", "button"],
    directory: "AlertDialog",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "audio-player",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "AudioPlayer",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "avatar",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "Avatar",
  // },
  {
    name: "button",
    dependencies: ["react-aria-components"],
    directory: "Button",
  },
  {
    name: "breadcrumbs",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "click-popover", "link", "listbox-item", "text"],
    directory: "Breadcrumbs",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "carousel",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "Carousel",
  // },
  {
    name: "checkbox",
    dependencies: ["react-aria-components"],
    directory: "Checkbox",
  },
  {
    name: "checkbox-group",
    dependencies: ["react-aria-components"],
    directory: "CheckboxGroup",
  },
  {
    name: "circular-progress",
    dependencies: ["framer-motion", "react-aria-components"],
    directory: "CircularProgress",
  },
  {
    name: "click-popover",
    dependencies: ["react-aria-components"],
    directory: "ClickPopover",
  },
  {
    name: "combo-box",
    dependencies: ["framer-motion", "react-aria-components"],
    registryDependencies: ["button", "input"],
    directory: "ComboBox",
  },
  {
    name: "counter",
    dependencies: ["react-aria-components"],
    registryDependencies: ["circular-progress", "text"],
    directory: "Counter",
  },
  // - TODO: -> Decide how to place common calendar styles
  {
    name: "datetime-picker",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button"],
    directory: "DateTimePicker",
  },
  // - TODO: -> Decide how to place common calendar styles
  {
    name: "datetime-range-picker",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button"],
    directory: "DateTimeRangePicker",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "drawer",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "Drawer",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "file-upload-surface",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "FileUploadSurface",
  // },
  {
    name: "form-field",
    dependencies: ["react-aria-components"],
    registryDependencies: ["text"],
    directory: "FormField",
  },
  {
    name: "hover-popover",
    dependencies: ["react-aria-components"],
    directory: "HoverPopover",
  },
  {
    name: "input",
    dependencies: ["react-aria-components"],
    directory: "Input",
  },
  {
    name: "line-segment",
    dependencies: ["react-aria-components"],
    directory: "LineSegment",
  },
  {
    name: "linear-progress",
    dependencies: ["framer-motion", "react-aria-components"],
    directory: "LinearProgress",
  },
  {
    name: "link",
    dependencies: ["next/link", "react"],
    directory: "Link",
  },
  {
    name: "listbox-item",
    dependencies: ["react-aria-components"],
    directory: "ListBoxItem",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "map",
  //   dependencies: ["react"],
  //   registryDependencies: [],
  //   directory: "Map",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "masonry-gallery",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "MasonryGallery",
  // },
  {
    name: "meter",
    dependencies: ["react-aria-components"],
    directory: "Meter",
  },
  {
    name: "modal",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "text"],
    directory: "Modal",
  },
  {
    name: "number-input",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "input"],
    directory: "NumberInput",
  },
  {
    name: "pagination",
    dependencies: ["react-aria-components"],
    registryDependencies: [
      "button", "click-popover","counter", "line-segment", "listbox-item", "form-field", "number-input", "select", "text"
    ],
    directory: "Pagination",
  },
  {
    name: "radio",
    dependencies: ["react-aria-components"],
    directory: "Radio",
  },
  {
    name: "radio-group",
    dependencies: ["react-aria-components"],
    directory: "RadioGroup",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "search-bar",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "SearchBar",
  // },
  {
    name: "select",
    dependencies: ["framer-motion", "react-aria-components"],
    registryDependencies: ["button"],
    directory: "Select",
  },
  {
    name: "slider",
    dependencies: ["react-aria-components"],
    registryDependencies: ["text"],
    directory: "Slider",
  },
  {
    name: "stepper",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "input"],
    directory: "Stepper",
  },
  {
    name: "switch",
    dependencies: ["react-aria-components"],
    directory: "Switch",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "table",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "Table",
  // },
  {
    name: "tag",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button"],
    directory: "Tag",
  },
  {
    name: "tag-combo-box",
    dependencies: ["react-aria-components"],
    registryDependencies: ["combo-box", "tag-group", "tag"],
    directory: "TagComboBox",
  },
  {
    name: "tag-group",
    dependencies: ["react-aria-components"],
    directory: "TagGroup",
  },
  {
    name: "text",
    dependencies: ["react-aria-components"],
    directory: "Text",
  },
  {
    name: "textarea",
    dependencies: ["react-aria-components"],
    directory: "TextArea",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "thumbnail-row",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "ThumbnailRow",
  // },
  {
    name: "time-picker",
    dependencies: ["react-aria-components"],
    directory: "TimePicker",
  },
  {
    name: "toaster",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "text"],
    directory: "Toaster",
  },
  {
    name: "tooltip",
    dependencies: ["react-aria-components"],
    directory: "",
  },
  {
    name: "toggle-button",
    dependencies: ["react-aria-components"],
    directory: "ToggleButton",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "tree",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "Tree"
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "video-player",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directory: "VideoPlayer",
  // },
];