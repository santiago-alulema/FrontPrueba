import Decimal from "decimal.js";
// Decimal.set({ precision: 5 })

export function initDecimal(number: Decimal.Value) {
  return new Decimal(number);
}

export type CalculateProductPriceVariationProps = {
  basePrice: number | Decimal;
  discount?: number;
  taxPercent: number;
  aditionalDiscount?: number;
}

export function calculateProductPriceVariation({
  basePrice,
  discount = 0,
  taxPercent,
  aditionalDiscount = 0,
}: CalculateProductPriceVariationProps) {
  const _basePrice =  typeof basePrice === 'number' ? initDecimal(basePrice) : basePrice;

  const _basetaxValue = getPercentValue(_basePrice, taxPercent);
  const originalPrice = _basePrice.plus(_basetaxValue);
  const originalPriceDisplay = originalPrice.toFixed(2);

  const discountValue = getPercentValue(_basePrice, discount);
  const priceWithDiscount = _basePrice.minus(discountValue);
  const firstDiscounttaxValue = getPercentValue(priceWithDiscount, taxPercent);
  
  const aditionalDiscountValue = getPercentValue(priceWithDiscount, aditionalDiscount);
  const priceWithAditionalDiscount = priceWithDiscount.minus(aditionalDiscountValue);
  
  const taxValue = getPercentValue(priceWithAditionalDiscount, taxPercent);
  const finalPrice = priceWithAditionalDiscount.plus(taxValue);

  const salePrice = priceWithDiscount.plus(firstDiscounttaxValue);
  const salePriceDisplay = salePrice.toFixed(2);

  const finalUnitPrice = finalPrice;
  const finalUnitPriceDisplay = finalPrice.toFixed(2);

  // const displayPrice = discount > 0 ? salePriceDisplay : originalPriceDisplay;

  return {
    originalPrice,
    originalPriceDisplay,
    salePrice,
    salePriceDisplay,
    finalUnitPrice,
    finalUnitPriceDisplay,
    discountValue: discountValue.plus(aditionalDiscountValue),
    taxValue,
  }
}

export function getPercentValue(price: number | Decimal, discountInPercentage: number = 0) {
  const value = (typeof price === 'number' ? initDecimal(price) : price).mul(initDecimal(discountInPercentage).dividedBy(100));
  return value.toDecimalPlaces(2);
}