import { em_font_sizes } from "../defaults/stylesDefaults";
import { ToolbarProps } from "../types";
import { FontSizeSelect } from "./FontSizeSelect";
import { ToolbarButton } from "./ToolbarButton";

/* Components */
export const Toolbar = ({
  dispatch,
  config,
  someEditorState,
}: ToolbarProps): JSX.Element => {
  const buttons = config.toolbar.buttons;
  const buttonSize = "is-medium";
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
      <FontSizeSelect
        dispatch={dispatch}
        someEditorState={someEditorState}
        selectData={em_font_sizes}
        className={buttonSize}
      />
    </div>
  );
};
