import { Amount } from "./Amount";
import { Breakdown } from "./Breakdown";

export type AmountWithBreakDown = Amount & {
  breakdown: Breakdown;
};
