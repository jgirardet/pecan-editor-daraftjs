import React, { useState } from "react";
import classNames from "classnames";
import {
  SomeEditorState,
  ToolbarButtonInput,
  ToolbarButtonProps,
} from "../types";

/* Component */

function isActiveButton(
  someEditorState: SomeEditorState,
  data: ToolbarButtonInput
): boolean {
  switch (data.type) {
    case "inline":
      return someEditorState.inlineStyles.includes(data.action);
    case "block":
      return someEditorState.blockType === data.action;
    default:
      return false;
  }
}

export const ToolbarButton = ({
  handler,
  buttonData,
  someEditorState,
  className = "",
  ...props
}: ToolbarButtonProps): JSX.Element => {
  const [pressed, setPressed] = useState("");
  const [hover, setHover] = useState("");
  const isActive = isActiveButton(someEditorState, buttonData)
    ? "has-text-info"
    : "";

  return (
    <button
      onMouseDown={(e: React.FormEvent) => {
        e.preventDefault();
        setPressed("is-focused");
        handler({
          type:
            someEditorState.blockType === "inline" ? "APPLY" : "BLOCK_CHANGE",
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
        // 'is-outlined',
        "has-tooltip-arrow",
        "has-tooltip-bottom",
        pressed,
        hover,
        isActive
      )}
      {...props}
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
