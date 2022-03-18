
export type ProductFilterState = {
  subcategoryIds?: number[];
  searchQuery?: string | null;
  priceRangeIndex?: number | null;
}

// undefined: not loaded yet
// null: no value
export const PRODUCT_FILTER_INITIAL_STATE: ProductFilterState = {
  subcategoryIds: undefined,
  searchQuery: undefined,
  priceRangeIndex: undefined,
};

export type ProductFilterAction =
  | { type: 'REHYDRATE', payload: ProductFilterState }
  | { type: 'SET_SUBCATEGORY', payload: number[] }
  | { type: 'SET_SEARCH_QUERY', payload: string | null }
  | { type: 'SET_PRICE_RANGE', payload: number | null }
  ;

export const reducer = (state: ProductFilterState, action: ProductFilterAction): ProductFilterState => {
  switch (action.type) {
    case "REHYDRATE":
      return { ...action.payload };

    case 'SET_SUBCATEGORY':
      return { ...state, subcategoryIds: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_PRICE_RANGE':
      return { ...state, priceRangeIndex: action.payload };

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
