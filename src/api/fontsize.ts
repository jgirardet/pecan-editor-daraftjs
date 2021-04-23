import { EditorState } from "draft-js";
import { BlockStyles } from "../types";

export const fontsize = (style: string) => new FontSize(style);

export class FontSize {
  _float: number = 0;
  constructor(val: string) {
    this._float = this.parseStyle(val);
  }

  public get float(): number {
    return this._float;
  }
  public increase(): string {
    return FontSize.fromFloat(this._float + this.getStep()).toStyle();
  }

  public decrease(): string {
    return FontSize.fromFloat(this._float - this.getStep()).toStyle();
  }

  public toStyle(): string {
    return "fontSize__" + this._float.toFixed(1) + "em";
  }

  public mul(x: number): string {
    return FontSize.fromFloat(this._float * x).toStyle();
  }

  public static fromEm(em: string | number): FontSize {
    if (typeof em === "string")
      return new FontSize("fontSize__" + em.trim().replace("em", ""));
    else return FontSize.fromFloat(em);
  }

  public static fromFloat(float: number): FontSize {
    return new FontSize("fontSize__" + float.toFixed(1));
  }

  /* ---------- Private ------------- */

  private parseStyle(val: string): number {
    return parseFloat(val.replace("em", "").split("__")[1]);
  }

  private _increase() {
    return this._float + 0.1;
  }

  private getStep() {
    // on ajoute "0,entier" ex : si 2.3 on ajoute 0.2, sir 3.5 on ajoute 0.3 mais minimum 0.1
    return Math.max(0.1, Math.trunc(this._float) / 10);
  }
}
