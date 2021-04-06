import { EditorState } from "draft-js";
import React, { useReducer } from "react";
import { pecanReduer } from "./pecan_reducer";
import { Defaults } from "../defaults";
import { DefaultsType, PecanContextProps } from "../types";

const pecanInitialState = EditorState.createEmpty();

function getConfig(): DefaultsType {
  return { ...Defaults };
}

export const PecanProvider = (props: any): JSX.Element => {
  const { initialState } = props;
  const [state, dispatch] = useReducer(
    pecanReduer,
    initialState ? initialState : pecanInitialState,
    undefined
  );
  const config = getConfig();
  return (
    <PecanContext.Provider
      value={{ editorState: state, dispatch: dispatch, config: config }}
    >
      {props.children}
    </PecanContext.Provider>
  );
};

export const PecanContext = React.createContext<PecanContextProps>({
  // editorState: pecanInitialState,
} as PecanContextProps);
