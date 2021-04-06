import { useContext, useEffect } from "react";
import { EditorState, RichUtils } from "draft-js";
import { Toolbar } from "./Toolbar";
import { PecanContext, PecanProvider } from "../hooks/pecan_context";
import { applyStyles } from "../api/dom_manipulation";
import { EditorArea } from "./EditorArea";
import { PecanEditorProps, SomeEditorState } from "../types";

export const BaseEditor = (): JSX.Element => {
  const { editorState, dispatch, config } = useContext(PecanContext);

  // Apply block styles
  const blockStyles = config.styles.blockStyles;

  useEffect(() => {
    applyStyles(blockStyles);
  }, [editorState, blockStyles]);

  // callbacks
  const onChange = (state: EditorState) => {
    dispatch({ type: "UPDATE", payload: state });
  };

  // const handleKeyCommand = (
  //   command: string,
  //   editorState: EditorState,
  // ): DraftHandleValue => {
  //     return handleL

  // };

  const currentStyles: SomeEditorState = {
    inlineStyles: editorState.getCurrentInlineStyle().toArray(),
    blockType: RichUtils.getCurrentBlockType(editorState),
  };
  return (
    <>
      <Toolbar
        dispatch={dispatch}
        config={config}
        someEditorState={currentStyles}
      />
      <EditorArea
        onChange={onChange}
        editorState={editorState}
        dispatch={dispatch}
        config={config}
      />
    </>
  );
};
  
export const PecanEditor = ({ initialState }: PecanEditorProps) => {
  return (
    <div className="block">
      <PecanProvider initialState={initialState}>
        <div>
          <BaseEditor />
        </div>
      </PecanProvider>
    </div>
  );
};
