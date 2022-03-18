export type CouponDto = {
  id: number;
  title: string;
  image: string;
  code: string;
  discountInPercent: number;
  products: number[];
  expiration_date: Date;
}