import { assert, expect } from "chai";
import { LayoutByCommand } from "../../types";
import { getKeyBindingFactory } from "../default_keybindings";
import React from "react";

function kbEvent(key: string, ctrl: boolean = false, shift: boolean = false) {
  return ({
    shiftKey: shift,
    ctrlKey: ctrl,
    key: key,
    preventDefault: ()=>{}
  } as unknown) as React.KeyboardEvent<{}>;
}

const COMMANDS = {
  ctrl: { modifiers: "ctrl", key: "b" },
  shift: { modifiers: "shift", key: "b" },
  ctrlshift: { modifiers: "ctrl+shift", key: "b" },
  noModifier: { modifiers: "", key: "b" },
} as LayoutByCommand;
describe("default_keybinding", () => {
  it("test getKeyBindingFunction", () => {
    assert(getKeyBindingFactory(COMMANDS)(kbEvent("b", true)) === "ctrl");
    assert(
      getKeyBindingFactory(COMMANDS)(kbEvent("b", false, true)) === "shift"
    );
    assert(
      getKeyBindingFactory(COMMANDS)(kbEvent("b", true, true)) === "ctrlshift"
    );
    assert(getKeyBindingFactory(COMMANDS)(kbEvent("b")) === "noModifier");
  });
});
