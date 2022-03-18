import { categorySlug } from "@constants";
import { CategorySlugType } from "types";

export const isCategorySlugType = (x: any): x is CategorySlugType => categorySlug.includes(x);
