import { BudgetItemType } from "constants/Budget";

export type GetBudgetDto = {
  name: BudgetItemType;
  value: number;
}

export type PostBudgetDto = {
  name: BudgetItemType;
  value: number;
}