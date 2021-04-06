import { StylesGroup } from "../types";

export const defaultFontFamily = 'verdana';

export const defaulBlockStyles: StylesGroup = {
  'pecan-titre1': {
    color: '#FF3860',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#FF3860',
    textTransform: 'uppercase',
    fontSize: '2.5em',
    fontWeight: '500',
    fontFamily: defaultFontFamily,
  },
  'pecan-titre2': {
    color: '#15b168',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#15b168',
    textTransform: 'capitalize',
    fontSize: '2.3em',
    fontWeight: '500',
    fontFamily: defaultFontFamily,
  },
  'pecan-titre3': {
    color: '#044cd3',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#044cd3',
    textTransform: undefined,
    fontSize: '2.1em',
    fontWeight: '500',
    fontFamily: defaultFontFamily,
  },
  'pecan-titre4': {
    color: '#faad1d',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#faad1d',
    textTransform: undefined,
    fontSize: '1.9em',
    fontWeight: '500',
    fontFamily: defaultFontFamily,
  },
  'pecan-unstyled': {
    color: '#444444',
    fontSize: '1.3em',
    fontWeight: '200',
    fontFamily: defaultFontFamily,
  },
};

export const StylesDefaults = {
  blockStyles: defaulBlockStyles,
};
