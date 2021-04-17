import { useContext } from "react";
import { RichUtils } from "draft-js";
import { Toolbar } from "./Toolbar";
import { PecanContext, PecanProvider } from "../hooks/pecan_context";
import { EditorArea } from "./EditorArea";
import { PecanEditorProps, SomeEditorState } from "../types";
import {
  findInlineBlockFontSize,
} from "../api/draftutils";
import { fontsize } from "../api/fontsize";

export const BaseEditor = (): JSX.Element => {
  const { editorState, dispatch, config } = useContext(PecanContext);

  // callbacks
  const currentStyles: SomeEditorState = {
    inlineStyles: editorState.getCurrentInlineStyle().toArray(),
    blockType: RichUtils.getCurrentBlockType(editorState),
    activeFontSize: fontsize(
      findInlineBlockFontSize(editorState, config.styles.blockStyles)
    ).float,
  };
  return (
    <>
      <Toolbar
        dispatch={dispatch}
        config={config}
        someEditorState={currentStyles}
      />

      <EditorArea
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
