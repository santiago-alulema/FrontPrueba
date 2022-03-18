export const BUDGET_INCOME = "income";
export const BUDGET_ENTRY = "entry";
export const BUDGET_SALARY = "salary";
export const BUDGET_OTHER = "other";

export const BUDGET_EXPENSES = "expenses";

export const BUDGET_ESSENTIAL = "essential";
export const BUDGET_RADI = "radi";
export const BUDGET_OTHERFOOD = "otherFood";
export const BUDGET_MEDICINE = "medicine";
export const BUDGET_TRANSPORT = "transport";
export const BUDGET_RENT = "rent";
export const BUDGET_WATERSERVICE = "waterService";
export const BUDGET_INTERNET = "internet";
export const BUDGET_CELLPHONE = "cellphone";

export const BUDGET_ENTERTAINMENT = "entertainment";
export const BUDGET_STREETFOOD = "streetFood";
export const BUDGET_RECREATIVE = "recreative";

export const BUDGET_OPTIONAL = "optional";
export const BUDGET_HOMEAPPLIANCES = "homeAppliances";
export const BUDGET_CLOTHING = "clothing";
export const BUDGET_ALCOHOL = "alcohol";

export const BUDGET_EXTRAS = "extras";
export const BUDGET_GIFTS = "gifts";
export const BUDGET_VACATIONS = "vacations";

export const budgetType = [
  BUDGET_INCOME,
  BUDGET_EXPENSES,
] as const;

export type BudgetTypeType = typeof budgetType[number];

export const isBudgetTypeType = (x: any): x is BudgetTypeType => budgetType.includes(x);

export const budgetGroup = [
  BUDGET_ENTRY,
  BUDGET_ESSENTIAL,
  BUDGET_ENTERTAINMENT,
  BUDGET_OPTIONAL,
  BUDGET_EXTRAS,
] as const;

export type BudgetGroupType = typeof budgetGroup[number];

export const isBudgetGroupType = (x: any): x is BudgetGroupType => budgetGroup.includes(x);

export const budgetItem = [
  BUDGET_INCOME,
  BUDGET_ENTRY,
  BUDGET_SALARY,
  BUDGET_OTHER,
  BUDGET_EXPENSES,
  BUDGET_ESSENTIAL,
  BUDGET_RADI,
  BUDGET_OTHERFOOD,
  BUDGET_MEDICINE,
  BUDGET_TRANSPORT,
  BUDGET_RENT,
  BUDGET_WATERSERVICE,
  BUDGET_INTERNET,
  BUDGET_CELLPHONE,
  BUDGET_ENTERTAINMENT,
  BUDGET_STREETFOOD,
  BUDGET_RECREATIVE,
  BUDGET_OPTIONAL,
  BUDGET_HOMEAPPLIANCES,
  BUDGET_CLOTHING,
  BUDGET_ALCOHOL,
  BUDGET_EXTRAS,
  BUDGET_GIFTS,
  BUDGET_VACATIONS
] as const;

export type BudgetItemType = typeof budgetItem[number];

export const isBudgetItemType = (x: any): x is BudgetItemType => budgetItem.includes(x);