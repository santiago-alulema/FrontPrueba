import { Amount } from ".";

export type AmountWithPercent = Amount & {
  percent: number;
};
