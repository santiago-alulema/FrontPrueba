import { LocaleType } from "types/lang";

export type LanguageState = {
  locale: LocaleType;
}

export type LanguageAction =
  | { type: 'REHYDRATE', payload: LanguageState }
  | { type: 'SET_LANGUAGE', payload: LocaleType }
  ;

export const reducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case "REHYDRATE":
      return { ...action.payload };

    case 'SET_LANGUAGE':
      return { ...state, locale: action.payload };

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
