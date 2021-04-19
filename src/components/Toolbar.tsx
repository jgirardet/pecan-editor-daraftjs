import React from "react";
import { ToolbarProps } from "../types";
import { FontSizeDropDown } from "./FontSizeDropDown";
import { ToolbarButton } from "./ToolbarButton";

/* Components */
export const Toolbar = ({
  dispatch,
  config,
  someEditorState,
}: ToolbarProps): JSX.Element => {
  const buttons = config.toolbar.buttons;
  const buttonSize = config.editor.toolbarVariant;
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
      <FontSizeDropDown />
    </div>
  );
};
