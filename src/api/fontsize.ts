import { EditorState } from "draft-js";
import { BlockStyles, DefaultsType } from "../types";

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
    return "FONTSIZE__" + this._float.toFixed(1);
  }

  /* get active fontsize in current Block */
  public static fromBlock(
    state: EditorState,
    blockStyles: BlockStyles,
    key: string
  ): FontSize | void {
    const block = state.getCurrentContent().getBlockMap().get(key);
    const em = blockStyles.find((x) =>
      x?.type === block.getType() ? true : false
    ).styles["font-size"];
    return em ? FontSize.fromEm(em) : undefined;
  }

  public static fromEm(em: string): FontSize {
    return new FontSize("FONTSIZE__" + em.trim().replace("em", ""));
  }

  public static fromFloat(float: number): FontSize {
    return new FontSize("FONTSIZE__" + float.toFixed(1));
  }

  /* ---------- Private ------------- */

  private parseStyle(val: string): number {
    return parseFloat(val.split("__")[1]);
  }

  private _increase() {
    return this._float + 0.1;
  }

  private getStep() {
    // on ajoute "0,entier" ex : si 2.3 on ajoute 0.2, sir 3.5 on ajoute 0.3 mais minimum 0.1
    return Math.max(0.1, Math.trunc(this._float) / 10);
  }
}
