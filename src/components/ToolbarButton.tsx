import React, { useState } from "react";
import classNames from "classnames";
import { SharedState, ToolbarButtonInput, ToolbarButtonProps } from "../types";

/* Component */

function isActiveButton(
  sharedState: SharedState,
  data: ToolbarButtonInput
): boolean {
  switch (data.type) {
    case "inline":
      return sharedState.inlineStyles.includes(data.action);
    case "block":
      return sharedState.blockType === data.action;
    default:
      return false;
  }
}

export const ToolbarButton = ({
  dispatch,
  buttonData,
  sharedState,
  className = "",
  ...props
}: ToolbarButtonProps): JSX.Element => {
  const [pressed, setPressed] = useState("");
  const [hover, setHover] = useState("");
  const isActive = isActiveButton(sharedState, buttonData)
    ? "has-text-info"
    : "";

  return (
    <button
      onMouseDown={(e: React.FormEvent) => {
        e.preventDefault();
        setPressed("is-focused");
        dispatch({
          type: buttonData.type === "inline" ? "APPLY" : "BLOCK_CHANGE",
          payload: buttonData.action,
        });
      }}
      onMouseUp={() => setPressed("")}
      onMouseLeave={() => setHover("")}
      onMouseEnter={() => setHover("is-active")}
      aria-label={buttonData.action}
      {...buttonData.otherProps}
      data-tooltip={buttonData.tooltip}
      className={classNames(
        className,
        "button",
        "has-tooltip-arrow",
        "has-tooltip-bottom",
        pressed,
        hover,
        isActive
      )}
    >
      {
        <span
          aria-label="icon-button"
          className={
            buttonData.icon
              ? classNames("icon", buttonData.icon)
              : classNames("icon", "ri-error-warning-fill")
          }
        />
      }
    </button>
  );
};
