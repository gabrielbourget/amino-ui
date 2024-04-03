import type { TRegistry } from "./schema";

const baseDependencies = ["react", "react-dom", "classnames"];

export const components: TRegistry = [
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "accordion",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/Accordion"],
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "action-sheet",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/ActionSheet"],
  // },
  {
    name: "alert-dialog",
    dependencies: ["react-aria-components"],
    registryDependencies: ["text", "button"],
    directories: ["components/AlertDialog"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "audio-player",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/AudioPlayer"],
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "avatar",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/Avatar"],
  // },
  {
    name: "button",
    dependencies: ["react-aria-components"],
    directories: ["components/Button"],
  },
  {
    name: "breadcrumbs",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "click-popover", "link", "listbox-item", "text"],
    directories: ["components/Breadcrumbs"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "carousel",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/Carousel"],
  // },
  {
    name: "checkbox",
    dependencies: ["react-aria-components"],
    directories: ["components/Checkbox"],
  },
  {
    name: "checkbox-group",
    dependencies: ["react-aria-components"],
    directories: ["components/CheckboxGroup"],
  },
  {
    name: "circular-progress",
    dependencies: ["framer-motion", "react-aria-components"],
    directories: ["components/CircularProgress"],
  },
  {
    name: "click-popover",
    dependencies: ["react-aria-components"],
    directories: ["components/ClickPopover"],
  },
  {
    name: "combo-box",
    dependencies: ["framer-motion", "react-aria-components"],
    registryDependencies: ["button", "input"],
    directories: ["components/ComboBox"],
  },
  {
    name: "counter",
    dependencies: ["react-aria-components"],
    registryDependencies: ["circular-progress", "text"],
    directories: ["components/Counter"],
  },
  // - TODO: -> Decide how to place common calendar styles
  {
    name: "datetime-picker",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button"],
    directories: ["components/DateTimePicker"],
  },
  // - TODO: -> Decide how to place common calendar styles
  {
    name: "datetime-range-picker",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button"],
    directories: ["components/DateTimeRangePicker"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "drawer",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/Drawer"],
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "file-upload-surface",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/FileUploadSurface"],
  // },
  {
    name: "form-field",
    dependencies: ["react-aria-components"],
    registryDependencies: ["text"],
    directories: ["components/FormField"],
  },
  {
    name: "hover-popover",
    dependencies: ["react-aria-components"],
    directories: ["components/"],
  },
  {
    name: "input",
    dependencies: ["react-aria-components"],
    directories: ["components/Input"],
  },
  {
    name: "line-segment",
    dependencies: ["react-aria-components"],
    directories: ["components/LineSegment"],
  },
  {
    name: "linear-progress",
    dependencies: ["framer-motion", "react-aria-components"],
    directories: ["components/LinearProgress"],
  },
  {
    name: "link",
    dependencies: ["next/link", "react"],
    directories: ["components/Link"],
  },
  {
    name: "listbox-item",
    dependencies: ["react-aria-components"],
    directories: ["components/ListBoxItem"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "map",
  //   dependencies: ["react"],
  //   registryDependencies: [],
  //   directories: ["components/Map"],
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "masonry-gallery",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/MasonryGallery"],
  // },
  {
    name: "meter",
    dependencies: ["react-aria-components"],
    directories: ["components/Meter"],
  },
  {
    name: "modal",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "text"],
    directories: ["components/Modal"],
  },
  {
    name: "number-input",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "input"],
    directories: ["components/NumberInput"],
  },
  {
    name: "pagination",
    dependencies: ["react-aria-components"],
    registryDependencies: [
      "button", "click-popover","counter", "line-segment", "listbox-item", "form-field", "number-input", "select", "text"
    ],
    directories: ["components/Pagination"],
  },
  {
    name: "radio",
    dependencies: ["react-aria-components"],
    directories: ["components/Radio"],
  },
  {
    name: "radio-group",
    dependencies: ["react-aria-components"],
    directories: ["components/RadioGroup"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "search-bar",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/SearchBar"],
  // },
  {
    name: "select",
    dependencies: ["framer-motion", "react-aria-components"],
    registryDependencies: ["button"],
    directories: ["components/Select"],
  },
  {
    name: "slider",
    dependencies: ["react-aria-components"],
    registryDependencies: ["text"],
    directories: ["components/Slider"],
  },
  {
    name: "stepper",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "input"],
    directories: ["components/Stepper"],
  },
  {
    name: "switch",
    dependencies: ["react-aria-components"],
    directories: ["components/Switch"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "table",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/Table"],
  // },
  {
    name: "tag",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button"],
    directories: ["components/Tag"],
  },
  {
    name: "tag-combo-box",
    dependencies: ["react-aria-components"],
    registryDependencies: ["combo-box", "tag-group", "tag"],
    directories: ["components/TagComboBox"],
  },
  {
    name: "tag-group",
    dependencies: ["react-aria-components"],
    directories: ["components/TagGroup"],
  },
  {
    name: "text",
    dependencies: ["react-aria-components"],
    directories: ["components/Text"],
  },
  {
    name: "textarea",
    dependencies: ["react-aria-components"],
    directories: ["components/"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "thumbnail-row",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/ThumbnailRow"],
  // },
  {
    name: "time-picker",
    dependencies: ["react-aria-components"],
    directories: ["components/TimePicker"],
  },
  {
    name: "toaster",
    dependencies: ["react-aria-components"],
    registryDependencies: ["button", "text"],
    directories: ["components/Toaster"],
  },
  {
    name: "tooltip",
    dependencies: ["react-aria-components"],
    directories: ["components/"],
  },
  {
    name: "toggle-button",
    dependencies: ["react-aria-components"],
    directories: ["components/ToggleButton"],
  },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "tree",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/Tree"],
  // },
  // - TODO: -> Uncomment and double check details once component is implemented
  // {
  //   name: "video-player",
  //   dependencies: ["react-aria-components"],
  //   registryDependencies: [],
  //   directories: ["components/VideoPlayer"],
  // },
];