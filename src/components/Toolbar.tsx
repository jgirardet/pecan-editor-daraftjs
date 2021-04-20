import React, {  useMemo } from "react";
import { ToolbarProps } from "../types";
import { ColorDropDown } from "./ColorDropDown";
import { FontSizeDropDown } from "./FontSizeDropDown";
import { ToolbarButton } from "./ToolbarButton";

/* Components */
export const Toolbar = ({
  dispatch,
  config,
  someEditorState,
}: ToolbarProps): JSX.Element => {
  const { activeColor } = someEditorState;
  const buttons = config.toolbar.buttons;
  const buttonSize = config.editor.toolbarVariant;
  const colorDropDown = useMemo(
    () => <ColorDropDown colorStyle={activeColor} />,
    [activeColor]
  );
  return (
    <div className="level is-mobile is-justify-content-start">
      {buttons.map((b) => (
        <div className="">
          <ToolbarButton
            handler={dispatch}
            buttonData={b}
            key={b.action}
            className={buttonSize}
            someEditorState={someEditorState}
          />
        </div>
      ))}
      {colorDropDown}
      <FontSizeDropDown />
    </div>
  );
};
