import classnames from "classnames";
import React, { useContext } from "react";
import { color, Color } from "../api/color";
import { findInlineBlockColor } from "../api/draftutils";
import { mostUsualColors } from "../defaults/stylesDefaults";
import { PecanContext } from "../hooks/pecan_context";
import { ColorDropDownProps } from "../types";
import { DropDown, DropDownItem } from "./DropDown";

export function ColorDropDown({ colorStyle }: ColorDropDownProps): JSX.Element {
  const { editorState, dispatch, config } = useContext(PecanContext);
  // const colorStyle = findInlineBlockColor(editorState, config.styles.blockStyles)
  const activeColor = colorStyle.startsWith("COLOR__#")
    ? color(findInlineBlockColor(editorState, config.styles.blockStyles)).hex
    : config.styles.defaultColors[colorStyle].color;
  const fontSizeLevel = 5;
  const fontSize = "is-size-" + fontSizeLevel;
  const icone = <i className="ri-input-method-line"></i>;
  const trigger = (
    <button
      className={classnames("button", fontSize, config.editor.toolbarVariant)}
    >
      <span className="icon" style={{ color: activeColor }}>
        {icone}
      </span>
    </button>
  );
  const values = [
    ...Object.entries(config.styles.defaultColors).map(([name, obj]) => [
      name.split("__")[1],
      obj.color,
    ]),
    ...mostUsualColors.map((x) => [x, x]),
  ];
  const onSelected = (value: string) => {
    const payload = "COLOR__" + value;
    dispatch({
      type: "APPLY",
      payload: payload,
    });
  };

  return (
    <DropDown
      trigger={trigger}
      // contentHeight={`${fontSizeLevel * 2.5}em`}
      contentWidth={`4em`}
    >
      {values.map(([nom, color]) => (
        <DropDownItem
          onSelected={onSelected}
          value={nom}
          className={classnames("p-3")}
          style={{ backgroundColor: color }}
          key={nom}
        ></DropDownItem>
      ))}
    </DropDown>
  );
}
