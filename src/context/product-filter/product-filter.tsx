import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { ProductFilterState, PRODUCT_FILTER_INITIAL_STATE } from '.';
import { reducer } from './product-filter.reducer';

export type ProductFilterType = {
  subcategories?: number[];
  priceRangeIndex?: number | null;
  searchQuery?: string | null;
  toggleSubcategory: (id: number) => void;
  setPriceRange: (index: number) => void;
  setSearchQuery: (query: string) => void;
  setInitialValue: (values: ProductFilterState) => void;
}

const ProductFilter = createContext({} as ProductFilterType);

export type ProductFilterProviderProps = {}

export const ProductFilterProvider = ({ children }: PropsWithChildren<ProductFilterProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, PRODUCT_FILTER_INITIAL_STATE);

  const toggleSubcategory = (id: number) => {
    const { subcategoryIds } = state;
    if (subcategoryIds) {
      const alreadySelected = subcategoryIds.includes(id);
      if (alreadySelected) {
        dispatch({ type: 'SET_SUBCATEGORY', payload: subcategoryIds.filter(idSelected => idSelected !== id) });
      } else {
        dispatch({ type: 'SET_SUBCATEGORY', payload: [...subcategoryIds, id] });
      }
    } else {
      dispatch({ type: 'SET_SUBCATEGORY', payload: [id] });
    }
  }

  const setPriceRange = (index: number) => {
    const { priceRangeIndex } = state;
    if (priceRangeIndex !== null) {
      const alreadySelected = priceRangeIndex === index;
      if (alreadySelected) {
        dispatch({ type: 'SET_PRICE_RANGE', payload: null });
      } else {
        dispatch({ type: 'SET_PRICE_RANGE', payload: index });
      }
    } else {
      dispatch({ type: 'SET_PRICE_RANGE', payload: index });
    }
  }

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }

  const setInitialValue = (values: ProductFilterState) => {
    dispatch({ type: 'REHYDRATE', payload: values });
  }

  return (
    <ProductFilter.Provider
      value={{
        subcategories: state.subcategoryIds,
        priceRangeIndex: state.priceRangeIndex,
        searchQuery: state.searchQuery,
        toggleSubcategory,
        setPriceRange,
        setSearchQuery,
        setInitialValue,
      }}
    >
      {children}
    </ProductFilter.Provider>
  );
};

export const useProductFilter = () => useContext(ProductFilter);
