import { useCallback, useMemo, useReducer } from "react";
import { EditorState } from "draft-js";
import { Toolbar } from "./Toolbar";
import { EditorArea } from "./EditorArea";
import { DefaultsType, PecanActionsTypes, SharedState } from "../types";
import { getSharedState } from "../api/draftutils";
import { pecanReducer } from "../hooks/pecan_reducer";
import { Defaults } from "../defaults";

function getConfig(): DefaultsType {
  return { ...Defaults };
}
export const PecanEditor = (): JSX.Element => {
  const config = useMemo(getConfig, []);
  const [editorState, _dispatch] = useReducer(
    pecanReducer,
    EditorState.createEmpty()
  );
  const dispatch = useCallback((action: PecanActionsTypes) => {
    _dispatch(action);
  }, []);
  const sharedState: SharedState = getSharedState(editorState, config);
  return (
    <>
      <Toolbar dispatch={dispatch} config={config} sharedState={sharedState} />
      <EditorArea
        editorState={editorState}
        dispatch={dispatch}
        config={config}
      />
    </>
  );
};
