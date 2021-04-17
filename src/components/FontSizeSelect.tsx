import classNames from "classnames";
import { FontSizeSelectProps } from "../types";
import { OrderedSet } from "immutable";
import { FontSize } from "../api/fontsize";
import React, { ChangeEvent } from "react";
export function FontSizeSelect({
  dispatch,
  someEditorState,
  selectData,
  ...props
}: FontSizeSelectProps): JSX.Element {
  const { className, ...rest } = props;
  const activeValue = someEditorState.activeFontSize;
  const values = OrderedSet([activeValue, ...selectData])
    .sort()
    .toArray();
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch({
      type: "APPLY",
      payload: FontSize.fromFloat(parseFloat(e.target.value)).toStyle(),
    });
  };
  return (
    <div className={classNames("select", className)} {...rest}>
      <select value={activeValue} onChange={onChange}>
        {values.map((v) => (
          <option key={v} value={v}>
            {v * 10}
          </option>
        ))}
      </select>
    </div>
  );
}
