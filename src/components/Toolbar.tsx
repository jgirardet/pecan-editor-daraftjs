import React from "react";
import { ToolbarProps } from "../types";
import { ColorDropDown } from "./ColorDropDown";
import { FontSizeDropDown } from "./FontSizeDropDown";
import { ToolbarButton } from "./ToolbarButton";

/* Components */
export const Toolbar = React.memo(
  ({ dispatch, config, sharedState }: ToolbarProps): JSX.Element => {
    const buttons = config.toolbar.buttons;
    const buttonSize = config.editor.toolbarVariant;
    return (
      <div className="level is-mobile is-justify-content-start">
        {buttons.map((b) => (
          <div className="">
            <ToolbarButton
              buttonData={b}
              key={b.action}
              className={buttonSize}
              {...{ dispatch, sharedState, config }}
            />
          </div>
        ))}
        <ColorDropDown {...{ sharedState, config, dispatch }} />
        <FontSizeDropDown {...{ sharedState, config, dispatch }} />
      </div>
    );
  },
  (prev, next) => {
    return JSON.stringify(prev) === JSON.stringify(next);
  }
);
