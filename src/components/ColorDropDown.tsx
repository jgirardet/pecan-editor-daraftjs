import classnames from "classnames";
import { color } from "../api/color";
import { mostUsualColors } from "../defaults/stylesDefaults";
import { ToolbarProps } from "../types";
import { DropDown, DropDownItem } from "./DropDown";

export function ColorDropDown({
  config,
  sharedState,
  dispatch,
}: ToolbarProps): JSX.Element {
  const { activeColor } = sharedState;
  const cssColor = activeColor.startsWith("COLOR__#")
    ? color(activeColor).hex
    : config.styles.defaultColors[activeColor].color;
  const fontSizeLevel = 5;
  const fontSize = "is-size-" + fontSizeLevel;
  const icone = <i className="ri-input-method-line"></i>;
  const trigger = (
    <button
      className={classnames("button", fontSize, config.editor.toolbarVariant)}
    >
      <span className="icon" style={{ color: cssColor }}>
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
