import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { LayoutByCommand } from 'src/defaults/keymapsDefaults';
import { getKeyBindingFunction } from '../default_keybindings';

// function kbEvent(key: string, ctrl: boolean = false, shift: boolean = false) {
function kbEvent(key: string, ctrl: boolean=false, shift: boolean=false) {
  return (new KeyboardEvent('keypress', {
    shiftKey: shift,
    ctrlKey: ctrl,
    key: key,
  }) as unknown) as React.KeyboardEvent<{}>;
}

const COMMANDS = {
  ctrl: { modifiers: 'ctrl', key: 'b' },
  shift: { modifiers: 'shift', key: 'b' },
  ctrlshift: { modifiers: 'ctrl+shift', key: 'b' },
  noModifier: { modifiers: '', key: 'b' },
} as LayoutByCommand;
test('test getKeyBindingFunction', () => {
  expect(getKeyBindingFunction(COMMANDS)(kbEvent('b', true))).toBe('ctrl');
  expect(getKeyBindingFunction(COMMANDS)(kbEvent('b', false, true))).toBe(
    'shift',
  );
  expect(getKeyBindingFunction(COMMANDS)(kbEvent('b', true, true))).toBe(
    'ctrlshift',
  );
  expect(getKeyBindingFunction(COMMANDS)(kbEvent('b'))).toBe(
    'noModifier',
  );
});
