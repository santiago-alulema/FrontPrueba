import { Stack, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

export type PriceDetailProps = {
  descriptionId: string;
  descriptionDefault: string;
  value: number;
}

export const PriceDetail = ({
  descriptionId,
  descriptionDefault,
  value,
}: PriceDetailProps) => {
  return (
    <Stack
      justifyContent="space-between"
      spacing={{
        sm: 1,
        md: 2,
        lg: 3,
      }}
      direction="row"
    >
      <Typography variant="body2" color="secondary">
        <FormattedMessage
          id={descriptionId}
          defaultMessage={descriptionDefault}
        />
      </Typography>
      <Typography variant="body2" color="primary">
        {
          `$ ${value.toFixed(2)}`
        }
      </Typography>
    </Stack>
  );
}