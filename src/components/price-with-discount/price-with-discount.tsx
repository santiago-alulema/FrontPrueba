import { Box, Typography } from "@mui/material";
import { calculateProductPriceVariation } from "hooks";
import React from "react";

export type PriceWithDiscountProps = {
  price: number;
  discount: number;
  taxPercent: number;
}

export const PriceWithDiscount = ({
  price,
  discount,
  taxPercent,
}: PriceWithDiscountProps) => {

  const { originalPriceDisplay, finalUnitPriceDisplay } = calculateProductPriceVariation({
    basePrice: price,
    taxPercent: taxPercent,
    discount: discount,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        marginTop: '1em',
      }}
    >
      <Typography variant="h5">
        {
          `$ ${finalUnitPriceDisplay}`
        }
      </Typography>
      {
        discount &&
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '-1.5em',
            px: 1,
            fontStyle: 'italic',
            '&:before': {
              content: '""',
              width: '100%',
              height: '1px',
              display: 'inline-block',
              backgroundColor: 'secondary.main',
              position: 'absolute',
              top: '50%',
              left: 0,
            },
          }}
        >
          {
            `$ ${originalPriceDisplay}`
          }
        </Typography>
      }
    </Box>
  );
}