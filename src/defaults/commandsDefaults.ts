export const STYLE_COMMANDS = [
  "BOLD",
  "CODE",
  "ITALIC",
  "STRIKETHROUGH",
  "UNDERLINE",
  // ...FONTSIZE_COMMANDS,
];

export const COLOR_COMMANDS = ["COLOR_1", "COLOR_2", "COLOR_3", "COLOR_4"];

export const BLOCK_COMMANDS = [
  "header-one",
  "header-two",
  "header-three",
  "header-four",
  "blockquote",
  "unorderedList",
  "orderedList",
];

export const CommandsDefaults = {
  styleCommands: STYLE_COMMANDS,
  blockCommands: BLOCK_COMMANDS,
};
