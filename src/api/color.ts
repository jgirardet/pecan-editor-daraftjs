import { EditorState } from "draft-js";
import parseColor, { Color as ColorParse } from "parse-color";
import { BlockStyles } from "../types";
import { FontSize } from "./fontsize";

export const color = (val: string | ColorParse) => new Color(val);

export class Color {
  _color: ColorParse | undefined;
  constructor(val: ColorParse | string) {
        if (typeof val === "string" && val.startsWith("COLOR__"))
      this._color = this.parseStyle(val);
    else if (typeof val === "string") this._color = parseColor(val);
    else this._color = val;
  }

  public toStyle(): string {
    return "COLOR__" + this._color?.hex;
  }

  public get hex(): string {
    return this._color?.hex || "";
  }

  /* get active fontsize in current Block */
  public static fromBlock(
    state: EditorState,
    blockStyles: BlockStyles,
    key: string
  ): Color | void {
    const block = state.getCurrentContent().getBlockMap().get(key);
    const colored = blockStyles.find((x) =>
      x?.type === block.getType() ? true : false
    ).styles["color"];
    return colored ? color(colored) : undefined;
  }

  /* ---------- Private ------------- */

  private parseStyle(val: string): ColorParse {
    return parseColor(val.split("__")[1]);
  }
}
