import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useProductFilter } from "context/product-filter";
import React from "react";
import { GetSubcategoriesDto } from "types/dtos";

export type SubcategoryFilterProps = {
  subcategoryList?: GetSubcategoriesDto[];
}

export const SubcategoryFilter = ({ subcategoryList }: SubcategoryFilterProps) => {
  const { subcategories, toggleSubcategory } = useProductFilter();

  return (
    <Stack
      direction="column"
      maxHeight={{
        xs: "min(30vh, 50vw)",
        sm: "max(50vh, 300px)",
      }}
      overflow="auto"
    >
      {
        subcategoryList?.map(({ id, title }) => (
          <FormControlLabel
            key={id}
            value={subcategories?.includes(id) || false}
            control={
              <Checkbox
                color="secondary"
                checked={subcategories?.includes(id) || false}
                onChange={() => toggleSubcategory(id)}
              />
            }
            label={title}
          />
        ))
      }
    </Stack>
  );
}