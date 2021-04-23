import { EditorState } from "draft-js";
import parseColor, { Color as ColorParse } from "parse-color";
import { BlockStyles } from "../types";

export const color = (val: string | ColorParse) => new Color(val);

export class Color {
  _color: ColorParse | undefined;
  constructor(val: ColorParse | string) {
    if (typeof val === "string" && val.startsWith("color__"))
      this._color = this.parseStyle(val);
    else if (typeof val === "string") this._color = parseColor(val);
    else this._color = val;
  }

  public toStyle(): string {
    return "color__" + this._color?.hex;
  }

  public get hex(): string {
    return this._color?.hex || "";
  }

  /* ---------- Private ------------- */

  private parseStyle(val: string): ColorParse {
    return parseColor(val.split("__")[1]);
  }
}
