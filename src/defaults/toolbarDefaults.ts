import { ToolbarButtonInput, ToolbarDefaultsType } from "../types";

export const defaultToolbarButtons: ToolbarButtonInput[] = [
  {
    tooltip: "Gras",
    action: "BOLD",
    icon: "ri-bold",
    type: "inline",
  },
  {
    tooltip: "Italic",
    action: "ITALIC",
    icon: "ri-italic",
    type: "inline",
  },
  {
    tooltip: "Souligné",
    action: "UNDERLINE",
    icon: "ri-underline",
    type: "inline",
  },
  {
    tooltip: "Barré",
    action: "STRIKETHROUGH",
    icon: "ri-strikethrough",
    type: "inline",
  },
  {
    tooltip: "Code",
    action: "CODE",
    icon: "ri-code-fill",
    type: "inline",
  },
  {
    tooltip: "Effacer le formattage",
    action: "CLEAR_FORMAT",
    icon: "ri-format-clear",
    type: "inline",
  },
  {
    tooltip: "titre 1",
    action: "header-one",
    icon: "ri-h-1",
    type: "block",
  },
  {
    tooltip: "titre 2",
    action: "header-two",
    icon: "ri-h-2",
    type: "block",
  },
  {
    tooltip: "titre 3",
    action: "header-three",
    icon: "ri-h-3",
    type: "block",
  },
  {
    tooltip: "titre 4",
    action: "header-four",
    icon: "ri-h-4",
    type: "block",
  },
];
export const ToolbarDefaults: ToolbarDefaultsType = {
  buttons: defaultToolbarButtons,
};
