import Decimal from 'decimal.js';
import { useStorage } from 'hooks/use-storage';
import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer } from 'react';
import { StorageConfigType } from 'types';
import { CouponDto } from 'types/dtos';
import { Customer, Shipping } from 'types/dtos/order';
import { cartTotalTaxValue, initialCustomerValues } from '.';
import { cartGrandTotal, CartItemBaseInfo, CartItemInfoState, CartState, cartSubTotal, cartTotalDiscountValue, cartTotalQuantity, getItemIfAdded, isItemInCart, reducer } from './cart.reducer';

export type CartContextType = {
  isOpen: boolean;
  items: CartItemInfoState[];
  coupon?: CouponDto;
  cartItemsCount: number; //# of rows
  rehydrateError: any;
  shipping?: Shipping;
  customer: Customer;
  toggleCart: () => void;
  addItem: (item: CartItemBaseInfo) => void;
  removeItem: (item: CartItemBaseInfo) => void;
  removeItemFromCart: (item: CartItemInfoState) => void;
  clearCart: () => void;
  isInCart: (item: CartItemBaseInfo) => boolean;
  getItemAdded: (item: CartItemBaseInfo) => CartItemInfoState | undefined;
  getTotalQuantity: () => number;
  getCartTotal: (cartItems?: CartItemInfoState[], coupon?: CouponDto) => Decimal;
  getCartSubtotal: (cartItems?: CartItemInfoState[]) => Decimal;
  applyCoupon: (coupon: CouponDto) => void;
  removeCoupon: () => void;
  getCartTotalDiscountValue: (cartItems?: CartItemInfoState[]) => Decimal;
  getCartTotalTaxValue: (cartItems?: CartItemInfoState[]) => Decimal;
  setShipping: (shippingInfo: Shipping) => void;
  removeShipping: () => void;
  setCustomer: (CustomerInfo: Customer) => void;
  removeCustomer: () => void;
}

const CartContext = createContext({} as CartContextType);

const INITIAL_STATE: CartState = {
  isOpen: false,
  items: [],
  customer: initialCustomerValues,
};

export type CartProviderProps = {}

export const CartProvider = ({ children }: PropsWithChildren<CartProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const addItem = (item: CartItemBaseInfo) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (item: CartItemBaseInfo) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const removeItemFromCart = (item: CartItemInfoState) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (item: CartItemBaseInfo) => isItemInCart(state.items, item);

  const getItemAdded = (item: CartItemBaseInfo) => getItemIfAdded(state.items, item);

  const getTotalQuantity = (): number => cartTotalQuantity(state.items);

  const getCartSubtotal = (cartItems = state.items) => cartSubTotal(cartItems);

  const getCartTotal = (cartItems = state.items, coupon = state.coupon) => cartGrandTotal(cartItems, coupon);

  const getCartTotalDiscountValue = (cartItems = state.items) => cartTotalDiscountValue(cartItems);

  const getCartTotalTaxValue = (cartItems = state.items) => cartTotalTaxValue(cartItems);


  const applyCoupon = (coupon: CouponDto) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const setShipping = (shippingInfo: Shipping) => {
    dispatch({ type: 'SET_SHIPPING', payload: shippingInfo });
  }

  const removeShipping = () => {
    dispatch({ type: 'REMOVE_SHIPPING' });
  }

  const setCustomer = (customerInfo: Customer) => {
    dispatch({ type: 'SET_CUSTOMER', payload: customerInfo });
  }

  const removeCustomer = () => {
    dispatch({ type: 'REMOVE_CUSTOMER' });
  }

  const rehydrateLocalState = (payload: CartState) => {
    dispatch({ type: 'REHYDRATE', payload });
  };

  const config = useMemo<StorageConfigType<CartState>>(() => (
    {
      key: 'radi-cart',
      version: 2,
      migrate: (state) => ({ ...state }),
    }
  ), []);

  const { error: rehydrateError } = useStorage({ state, setState: rehydrateLocalState, config });

  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        cartItemsCount: state.items?.length,
        rehydrateError,
        shipping: state.shipping,
        customer: state.customer,
        toggleCart,
        addItem,
        removeItem,
        removeItemFromCart,
        clearCart,
        isInCart,
        getItemAdded,
        getTotalQuantity,
        getCartTotal,
        getCartSubtotal,
        applyCoupon,
        removeCoupon,
        getCartTotalDiscountValue,
        getCartTotalTaxValue,
        setShipping,
        removeShipping,
        setCustomer,
        removeCustomer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
