import { useContext } from "react";
import { findInlineBlockFontSize } from "../api/draftutils";
import { FontSize, fontsize } from "../api/fontsize";
import { PecanContext } from "../hooks/pecan_context";
import { OrderedSet } from "immutable";
import { DropDown, DropDownItem } from "./DropDown";
import classNames from "classnames";

export function FontSizeDropDown(): JSX.Element {
  const { editorState, dispatch, config } = useContext(PecanContext);
  const activeFontSize = fontsize(
    findInlineBlockFontSize(editorState, config.styles.blockStyles)
  ).float;
  const fontSizeLevel = 5;
  const fontSize = "is-size-" + fontSizeLevel;
  const trigger = (
    <button
      className={classNames("button", config.editor.toolbarVariant, fontSize)}
    >
      <span>{activeFontSize * 10}</span>
      <span className="icon">
        <i className="ri-arrow-down-s-line"></i>
      </span>
    </button>
  );
  const onSelected = (value: number) =>
    dispatch({
      type: "APPLY",
      payload: FontSize.fromFloat(value).toStyle(),
    });

  const values = OrderedSet([activeFontSize, ...config.styles.defaultFontSizes])
    .sort()
    .toArray();

  return (
    <DropDown
      trigger={trigger}
      contentHeight={`${fontSizeLevel * 2.5}em`}
      contentWidth={`${fontSizeLevel}em`}
    >
      {values.map((v) => (
        <DropDownItem
          onSelected={onSelected}
          value={v}
          className={fontSize}
          key={v}
        >
          {v * 10}
        </DropDownItem>
      ))}
    </DropDown>
  );
}
