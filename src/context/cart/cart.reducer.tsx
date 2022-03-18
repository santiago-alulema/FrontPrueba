import Decimal from "decimal.js";
import { TiposIdentificacionEnum } from "enums";
import { calculateProductPriceVariation, CalculateProductPriceVariationProps, getPercentValue, initDecimal } from "hooks/use-decimal";
import { CouponDto } from "types/dtos";
import { Customer, Shipping } from "types/dtos/order";

export const initialCustomerValues = {
  identification: '',
  identificationType: TiposIdentificacionEnum.CEDULA,
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  areaCode: '',
  phone: '',
  zipCode: '',
}

export type CartItemAttribute = {
  id: number,
  name: string,
  price?: number,
  imageUrl?: string,
  detail?: string,
}

export type CartItemBaseInfo = {
  id: number,
  slug: string,
  name: string,
  image?: string,
  unit?: number,
  price: number,
  discountPercent: number,
  salePrice: number,
  taxPercent: number;
  stock: number;
}

export type CartItemInfoState = CartItemBaseInfo & {
  aditionalDiscount?: number;
  finalUnitPrice: number;
  quantity: number,
  totalDiscount: number,
  totalTax: number,
  totalPrice: number,
  couponApplied: boolean,
}

export type CartState = {
  isOpen: boolean;
  items: CartItemInfoState[];
  coupon?: CouponDto;
  shipping?: Shipping;
  customer: Customer;
}

export type CartAction =
  | { type: 'REHYDRATE', payload: CartState }
  | { type: 'TOGGLE_CART' }
  | { type: 'ADD_ITEM', payload: CartItemBaseInfo }
  | { type: 'REMOVE_ITEM', payload: CartItemBaseInfo }
  | { type: 'CLEAR_ITEM_FROM_CART', payload: CartItemInfoState }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON', payload: CouponDto }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_SHIPPING', payload: Shipping }
  | { type: 'REMOVE_SHIPPING' }
  | { type: 'SET_CUSTOMER', payload: Customer }
  | { type: 'REMOVE_CUSTOMER' }
  ;

export type QuantifiableField = keyof Pick<
  CartItemInfoState,
  'price' | 'salePrice' | 'quantity' | 'totalDiscount' | 'totalTax' | 'totalPrice'
>;

const cartValueTotal = (items: CartItemInfoState[], field: QuantifiableField): Decimal => {
  if (items === null || items.length === 0) return new Decimal(0);
  const total: Decimal = items.reduce((total: Decimal, currentItem) => {
    return total.plus(currentItem[field]);
  }, new Decimal(0));
  return total;
};

export const cartPriceTotal = (items: CartItemInfoState[]): Decimal => {
  return cartValueTotal(items, 'price');
};

export const cartSalePriceTotal = (items: CartItemInfoState[]): Decimal => {
  return cartValueTotal(items, 'salePrice');
};

export const cartTotalQuantity = (items: CartItemInfoState[]): number => {
  return cartValueTotal(items, 'quantity').toNumber();
};

export const cartSubTotal = (items: CartItemInfoState[]): Decimal => {
  const subtotal: Decimal = items.reduce((acc_subtotal: Decimal, currentItem: CartItemInfoState) => {
    return acc_subtotal.plus(cartItemOriginalTotal(currentItem));
  }, new Decimal(0));
  return subtotal;
};

export const cartGrandTotal = (items: CartItemInfoState[], coupon?: CouponDto): Decimal => {
  const cartTotal = cartValueTotal(items, 'totalPrice');
  if (coupon && coupon.products.length === 0) { //is a general coupon
    const couponDiscount = getPercentValue(cartTotal, coupon.discountInPercent);
    return cartTotal.minus(couponDiscount);
  }
  return cartTotal;
};

export const cartTotalDiscountPercent = (items: CartItemInfoState[]): Decimal => {
  const priceTotal = cartPriceTotal(items);
  const salePriceTotal = cartSalePriceTotal(items);

  return (initDecimal(1).minus(salePriceTotal.div(priceTotal))).times(10);
};

export const cartTotalDiscountValue = (items: CartItemInfoState[]): Decimal => {
  return cartValueTotal(items, 'totalDiscount');
};

export const cartTotalTaxValue = (items: CartItemInfoState[]): Decimal => {
  return cartValueTotal(items, 'totalTax');
};

export const cartItemOriginalTotal = (item: CartItemInfoState): Decimal => {
  return initDecimal(item.price).times(item.quantity);
};

type AddCartLineTotalsPriceProps = Partial<CalculateProductPriceVariationProps> & {
  quantity: number;
  couponApplied: boolean;
}

const addCartLineTotals = (cartItem: CartItemBaseInfo, overrideProps: AddCartLineTotalsPriceProps): CartItemInfoState => {
  const { basePrice, discount, taxPercent, aditionalDiscount, quantity, couponApplied } = overrideProps;

  const { originalPrice, salePriceDisplay, finalUnitPrice, finalUnitPriceDisplay, taxValue } = calculateProductPriceVariation({
    basePrice: basePrice ?? cartItem.price,
    discount: discount ?? cartItem.discountPercent,
    aditionalDiscount: aditionalDiscount,
    taxPercent: taxPercent ?? cartItem.taxPercent,
  });

  const totalDiscount = (originalPrice.minus(finalUnitPrice)).times(quantity);
  const totalTax = taxValue.times(quantity);
  const total = finalUnitPrice.times(quantity);

  return {
    ...cartItem,
    salePrice: +salePriceDisplay,
    finalUnitPrice: +finalUnitPriceDisplay,
    quantity,
    totalDiscount: totalDiscount.toNumber(),
    totalTax: totalTax.toNumber(),
    totalPrice: total.toNumber(),
    couponApplied,
  };
}

const getAddedIndex = (itemsAdded: CartItemInfoState[], itemToSearch: CartItemBaseInfo) => {
  return itemsAdded?.findIndex((i) => i.id === itemToSearch.id);
}

export const isItemInCart = (itemsAdded: CartItemInfoState[], item: CartItemBaseInfo) => {
  const existingCartItemIndex = getAddedIndex(itemsAdded, item);
  return existingCartItemIndex > -1;
};

export const getItemIfAdded = (itemsAdded: CartItemInfoState[], item: CartItemBaseInfo): CartItemInfoState | undefined => {
  const existingCartItemIndex = getAddedIndex(itemsAdded, item);
  if (existingCartItemIndex > -1) {
    return itemsAdded[existingCartItemIndex];
  }
  return;
}

// cartItems, cartItemToAdd
const addItemToCart = (itemsAdded: CartItemInfoState[], itemToAdd: CartItemBaseInfo): CartItemInfoState[] => {
  const unitToAdd = itemToAdd.unit ?? 1;

  const existingCartItemIndex = getAddedIndex(itemsAdded, itemToAdd);
  if (existingCartItemIndex > -1) {
    const newState = [...itemsAdded];
    const itemAdded = newState[existingCartItemIndex];
    const newQuantity = itemAdded.quantity + unitToAdd;

    const newCartItemTotals = addCartLineTotals(itemAdded, {
      basePrice: itemToAdd.price,
      discount: itemToAdd.discountPercent,
      taxPercent: itemToAdd.taxPercent,
      aditionalDiscount: itemAdded.aditionalDiscount,
      quantity: newQuantity,
      couponApplied: itemAdded.couponApplied,
    });

    newState[existingCartItemIndex] = newCartItemTotals;
    return newState;
  } else {
    const newCartItemTotals = addCartLineTotals(itemToAdd, {
      quantity: unitToAdd,
      couponApplied: false,
    });
    return [
      ...itemsAdded,
      newCartItemTotals
    ];
  }
};

// cartItems, cartItemToRemove
const removeItemFromCart = (itemsAdded: CartItemInfoState[], itemToRemove: CartItemBaseInfo): CartItemInfoState[] => {
  const existingCartItemIndex = getAddedIndex(itemsAdded, itemToRemove);
  if (existingCartItemIndex > -1) {
    return itemsAdded.reduce<CartItemInfoState[]>((acc: CartItemInfoState[], currentItem: CartItemInfoState, currentIndex: number) => {
      if (currentIndex === existingCartItemIndex) {
        const unitToRemove = itemToRemove.unit ?? 1;
        const newQuantity = currentItem.quantity - unitToRemove;
        if (newQuantity > 0) {
          const newCartItemTotals = addCartLineTotals(currentItem, {
            basePrice: itemToRemove.price,
            discount: itemToRemove.discountPercent,
            taxPercent: itemToRemove.taxPercent,
            quantity: newQuantity,
            couponApplied: currentItem.couponApplied,
          });
          return [
            ...acc,
            newCartItemTotals,
          ];
        } else {
          return [...acc];
        }
      }
      return [...acc, currentItem];
    }, []);
  }
  return itemsAdded;
};

const clearItemFromCart = (itemsAdded: CartItemInfoState[], itemToRemove: CartItemInfoState) => {
  const existingCartItemIndex = getAddedIndex(itemsAdded, itemToRemove);
  return itemsAdded.filter((_item, index) => index !== existingCartItemIndex);
};

const recalculateTotals = ({ items, ...rest }: CartState): CartState => {
  const calculatedItems = items?.map<CartItemInfoState>(
    (item: CartItemInfoState) => {
      const newCartItemTotals = addCartLineTotals(item, {
        basePrice: item.price,
        discount: item.discountPercent,
        taxPercent: item.taxPercent,
        aditionalDiscount: item.aditionalDiscount,
        quantity: item.quantity,
        couponApplied: item.couponApplied,
      });

      return newCartItemTotals;
    }) || [];
  return { ...rest, items: calculatedItems }
}

const applyCouponDiscountToItems = (itemsAdded: CartItemInfoState[], coupon: CouponDto): CartItemInfoState[] => {
  const { discountInPercent: aditionalDiscount } = coupon;
  return itemsAdded
    .map<CartItemInfoState>(currentItem => {
      const shouldApplyDiscount = coupon.products.includes(currentItem.id);
      if (shouldApplyDiscount) {
        const newCartItemTotals = addCartLineTotals(currentItem, {
          aditionalDiscount,
          quantity: currentItem.quantity,
          couponApplied: true,
        });

        return newCartItemTotals;
      }
      return currentItem;
    });
}

const removeCouponDiscountFromItems = (itemsAdded: CartItemInfoState[]): CartItemInfoState[] => {
  return itemsAdded.map<CartItemInfoState>(currentItem => {
    if (currentItem.aditionalDiscount) {
      const newCartItemTotals = addCartLineTotals(currentItem, {
        aditionalDiscount: 0,
        quantity: currentItem.quantity,
        couponApplied: false,
      });

      return newCartItemTotals;
    }
    return currentItem;
  });
}

export const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "REHYDRATE":
      const rehydratedState = action.payload && recalculateTotals(action.payload);
      return { ...state, ...rehydratedState };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'ADD_ITEM':
      return { ...state, items: addItemToCart(state.items, action.payload) };

    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromCart(state.items, action.payload) };

    case 'CLEAR_ITEM_FROM_CART':
      return { ...state, items: clearItemFromCart(state.items, action.payload) };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'APPLY_COUPON':
      const affectItems = action.payload.products.length > 0;
      if (affectItems) {
        return { ...state, coupon: action.payload, items: applyCouponDiscountToItems(state.items, action.payload) };
      } else {
        return { ...state, coupon: action.payload };
      }

    case 'REMOVE_COUPON':
      return { ...state, coupon: undefined, items: removeCouponDiscountFromItems(state.items) };

    case 'SET_SHIPPING':
      return { ...state, shipping: action.payload };

    case 'REMOVE_SHIPPING':
      return { ...state, shipping: undefined };

    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };

    case 'REMOVE_CUSTOMER':
      return { ...state, customer: initialCustomerValues };

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
