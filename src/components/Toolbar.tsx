import { ToolbarProps } from "../types";
import { ToolbarButton } from "./ToolbarButton";

/* Components */
export const Toolbar = ({
  dispatch,
  config,
  someEditorState,
}: ToolbarProps): JSX.Element => {
  const buttons = config.toolbar.buttons;
  return (
    <div className="level is-mobile is-justify-content-start">
      {buttons.map((b) => (
        <div className="">
          <ToolbarButton
            handler={dispatch}
            buttonData={b}
            key={b.action}
            className="is-medium"
            someEditorState={someEditorState}
          />
        </div>
      ))}
    </div>
  );
};
