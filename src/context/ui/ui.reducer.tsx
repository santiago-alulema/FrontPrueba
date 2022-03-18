
export type UiState = {
  isCategoriesDrawerOpen: boolean;
}

export type CartAction =
  | { type: 'REHYDRATE', payload: UiState }
  | { type: 'TOGGLE_CATEGORIES_DRAWER' }
  ;

export const reducer = (state: UiState, action: CartAction): UiState => {
  switch (action.type) {
    case "REHYDRATE":
      return { ...action.payload };

    case 'TOGGLE_CATEGORIES_DRAWER':
      return { ...state, isCategoriesDrawerOpen: !state.isCategoriesDrawerOpen };

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
