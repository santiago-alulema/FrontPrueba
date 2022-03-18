import { BudgetGroupType, BudgetTypeType } from "constants/Budget";
import { PostBudgetDto } from "types/dtos";
import { SecurityParams } from "types/params";

export type GetBudgetParams = SecurityParams & {
  type?: BudgetTypeType;
  group?: BudgetGroupType;
  dateFrom?: string;
  dateTo?: string;
};

export type PostBudgetParams = SecurityParams & {
  data: PostBudgetDto[];
};