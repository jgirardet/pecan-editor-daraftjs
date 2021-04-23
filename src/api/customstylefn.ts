import { CustomStyleFn, CustomStyleFnParams } from "../types";
import CSS from "csstype";
import { CSSProperties } from "react";
import { FontSize } from "./fontsize";

/*
CustomStyleFn

Every style render (block and inline) are done here.
Its done via building a specific worker for each CssProperty

Generic cases must be added to customStyleFnProperties and will be handled by StyletoCss
Special cases can be implemented separatly and add to customStyleFnWorkers
*/

const customStyleFnProperties = [
  "fontSize",
  "textDecorationLine",
  "textDecorationStyle",
  "textDecorationColor",
  "textTransform",
  "fontFamily",
];

/*
Adpatater between draft inlinestyle and ccs properties
*/
function StyletoCss(name: string) {
  return ({ style, currentBlockStyle }: CustomStyleFnParams): CSSProperties => {
    const stylestring = style.find((v) => v!.startsWith(name + "__"));
    if (stylestring) {
      return { [name]: stylestring.split("__")[1] };
    } else {
      const cssstyle = currentBlockStyle[name as keyof CSS.Properties];
      return cssstyle ? { [name]: cssstyle } : {};
    }
  };
}

/*
Cusotm adaptater for color handling color shortcut
*/
function colorStyletoCss({
  style,
  styles,
  ...rest
}: CustomStyleFnParams): CSSProperties {
  const stylestring = style.find((v) =>
    ["color__1", "color__2", "color__3", "color__4"].includes(v!)
  );
  if (stylestring) return { color: styles.defaultColors[stylestring].color };
  else return StyletoCss("color")({ style, styles, ...rest });
}

/*
Cusotm adaptater for verticalAlign to adapt fontSize
*/
function verticalAlignStyletoCss({
  style,
  styles,
  alreadyBuild,
  ...rest
}: CustomStyleFnParams): CSSProperties {
  const res = StyletoCss("verticalAlign")({
    style,
    styles,
    alreadyBuild,
    ...rest,
  });
  if (res.verticalAlign) {
    const fontSize = alreadyBuild.fontSize;
    const verticalFontSize: string = FontSize.fromEm(fontSize as string)
      .mul(0.5)
      .split("__")[1];
    return { ...res, fontSize: verticalFontSize };
  } else return {};
}

/*
Custom adaptater for fontWeight to handle "BOLD"
*/
function fontWeightStyletoCss({
  style,
  ...rest
}: CustomStyleFnParams): CSSProperties {
  if (style.has("BOLD")) return {};
  else {
    const res = StyletoCss("fontWeight")({ style, ...rest });
    const asInt = parseInt(res.fontWeight as string)
    if (isNaN(asInt))
      return res
    else return {"fontWeight": asInt}
  } 
}

export const customStyleFnWorkers: CustomStyleFn[] = [
  colorStyletoCss,
  fontWeightStyletoCss,
  ...customStyleFnProperties.map((x) => StyletoCss(x)),
  verticalAlignStyletoCss, // should always be after fontSize
];
