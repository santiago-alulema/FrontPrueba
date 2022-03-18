import { priceRanges } from "@constants";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useProductFilter } from "context/product-filter";
import React from "react";
import { FormattedMessage } from "react-intl";

export type FilterPriceRangeProps = {
}

export const FilterPriceRange = ({ }: FilterPriceRangeProps) => {
  const { priceRangeIndex, setPriceRange } = useProductFilter();

  const intl = {
    "0.0": "", // this should never be reached
    "1.0": "priceRange.above",
    "0.1": "priceRange.below",
    "1.1": "priceRange.between",
  }

  return (
    <Stack direction="column" spacing={2}>
      <Typography
        variant="h5"
        sx={{
          mt: 3,
        }}
      >
        <FormattedMessage id="priceRange.title" defaultMessage="Precios" />
      </Typography>
      {
        priceRanges
          .filter(({ priceMin, priceMax }) => priceMin !== undefined || priceMax)
          .map(({ priceMin, priceMax }, index) => (
            <FormControlLabel
              key={`${priceMin}-${priceMax}`}
              control={
                <Checkbox
                  color="secondary"
                  checked={index === priceRangeIndex}
                  onChange={() => setPriceRange(index)}
                />
              }
              label={
                <FormattedMessage
                  id={intl[`${priceMin !== undefined ? 1 : 0}.${priceMax !== undefined ? 1 : 0}`]}
                  defaultMessage="De {valueMin} a {valueMax}"
                  values={{
                    valueMin: `$${priceMin}`,
                    valueMax: `$${priceMax}`,
                  }}
                />
              }
            />
          ))
      }
    </Stack>
  );
}