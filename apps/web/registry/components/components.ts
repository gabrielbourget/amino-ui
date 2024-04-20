import type { TRegistry } from "./schema";

const baseDependencies = ["react", "react-dom", "classnames"];

export const components: TRegistry = [
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "accordion",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "Accordion",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "action-sheet",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "ActionSheet",
  // },
  {
    name: "alert-dialog",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["text", "button"],
    directory: "AlertDialog",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "audio-player",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "AudioPlayer",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "avatar",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "Avatar",
  // },
  {
    name: "button",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Button",
  },
  {
    name: "breadcrumbs",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button", "click-popover", "link", "listbox-item", "text"],
    directory: "Breadcrumbs",
  },
  {
    name: "calendar-icon",
    isIcon: true,
    directory: "CalendarIcon",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "carousel",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "Carousel",
  // },
  {
    name: "checkbox",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Checkbox",
  },
  {
    name: "checkbox-group",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "CheckboxGroup",
  },
  {
    name: "checkmark-icon",
    isIcon: true,
    directory: "CheckmarkIcon",
  },
  {
    name: "chevron-down-icon",
    isIcon: true,
    directory: "ChevronDownIcon",
  },
  {
    name: "chevron-left-icon",
    isIcon: true,
    directory: "ChevronLeftIcon",
  },
  {
    name: "chevron-right-icon",
    isIcon: true,
    directory: "ChevronRightIcon",
  },
  {
    name: "chevron-up-icon",
    isIcon: true,
    directory: "ChevronUpIcon",
  },
  {
    name: "circular-progress",
    isIcon: false,
    dependencies: ["framer-motion", "react-aria-components"],
    directory: "CircularProgress",
  },
  {
    name: "click-popover",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "ClickPopover",
  },
  {
    name: "clock-icon",
    isIcon: true,
    directory: "ClockIcon",
  },
  {
    name: "combo-box",
    isIcon: false,
    dependencies: ["framer-motion", "react-aria-components"],
    componentRegistryDependencies: ["button", "input"],
    directory: "ComboBox",
  },
  {
    name: "context-menu-horizontal-icon",
    isIcon: true,
    directory: "ContextMenuHorizontalIcon",
  },
  {
    name: "counter",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["circular-progress", "text"],
    directory: "Counter",
  },
  // - TODO: -> Decide how to place common calendar styles
  {
    name: "datetime-picker",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button"],
    directory: "DateTimePicker",
  },
  // - TODO: -> Decide how to place common calendar styles
  {
    name: "datetime-range-picker",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button"],
    directory: "DateTimeRangePicker",
  },
  {
    name: "double-chevron-left-icon",
    isIcon: true,
    directory: "DoubleChevronLeftIcon",
  },
  {
    name: "double-chevron-right-icon",
    isIcon: true,
    directory: "DoubleChevronRightIcon",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "drawer",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "Drawer",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "file-upload-surface",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "FileUploadSurface",
  // },
  {
    name: "form-field",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["text"],
    directory: "FormField",
  },
  {
    name: "gargage-bin-icon",
    isIcon: true,
    directory: "GarbageBinIcon",
  },
  {
    name: "hover-popover",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "HoverPopover",
  },
  {
    name: "info-icon",
    isIcon: true,
    directory: "InfoIcon",
  },
  {
    name: "input",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Input",
  },
  {
    name: "line-segment",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "LineSegment",
  },
  {
    name: "linear-progress",
    isIcon: false,
    dependencies: ["framer-motion", "react-aria-components"],
    directory: "LinearProgress",
  },
  {
    name: "link",
    isIcon: false,
    dependencies: ["next/link", "react"],
    directory: "Link",
  },
  {
    name: "listbox-item",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "ListBoxItem",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "map",
  //   isIcon: false,
  //   dependencies: ["react"],
  //   componentRegistryDependencies: [],
  //   directory: "Map",
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "masonry-gallery",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "MasonryGallery",
  // },
  {
    name: "meter",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Meter",
  },
  {
    name: "minus-icon",
    isIcon: true,
    directory: "MinusIcon",
  },
  {
    name: "modal",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button", "text"],
    directory: "Modal",
  },
  {
    name: "number-input",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button", "input"],
    directory: "NumberInput",
  },
  {
    name: "octagon-frame-exclamation-icon",
    isIcon: true,
    directory: "OctagonFrameExclamationIcon",
  },
  {
    name: "pagination",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: [
      "button", "click-popover","counter", "line-segment", "listbox-item", "form-field",
      "number-input", "select", "text"
    ],
    directory: "Pagination",
  },
  {
    name: "plus-icon",
    isIcon: true,
    directory: "PlusIcon",
  },
  {
    name: "radio",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Radio",
  },
  {
    name: "radio-group",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "RadioGroup",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "search-bar",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "SearchBar",
  // },
  {
    name: "select",
    isIcon: false,
    dependencies: ["framer-motion", "react-aria-components"],
    componentRegistryDependencies: ["button"],
    directory: "Select",
  },
  {
    name: "slider",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["text"],
    directory: "Slider",
  },
  {
    name: "stepper",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button", "input"],
    directory: "Stepper",
  },
  {
    name: "switch",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Switch",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "table",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "Table",
  // },
  {
    name: "tag",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button"],
    directory: "Tag",
  },
  {
    name: "tag-combo-box",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["combo-box", "tag-group", "tag"],
    directory: "TagComboBox",
  },
  {
    name: "tag-group",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "TagGroup",
  },
  {
    name: "text",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "Text",
  },
  {
    name: "textarea",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "TextArea",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "thumbnail-row",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "ThumbnailRow",
  // },
  {
    name: "time-picker",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "TimePicker",
  },
  {
    name: "toaster",
    isIcon: false,
    dependencies: ["react-aria-components"],
    componentRegistryDependencies: ["button", "text"],
    directory: "Toaster",
  },
  {
    name: "tooltip",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "",
  },
  {
    name: "toggle-button",
    isIcon: false,
    dependencies: ["react-aria-components"],
    directory: "ToggleButton",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "tree",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "Tree"
  // },
  {
    name: "triangle-frame-exclamation-icon",
    isIcon: true,
    directory: "TriangleFrameExclamationIcon",
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "video-player",
  //   isIcon: false,
  //   dependencies: ["react-aria-components"],
  //   componentRegistryDependencies: [],
  //   directory: "VideoPlayer",
  // },
  {
    name: "x-icon",
    isIcon: true,
    directory: "XIcon",
  },
];
