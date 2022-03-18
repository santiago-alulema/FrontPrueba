import { Box, Typography } from "@mui/material";
import React from "react";

export type DiscountBadgeProps = {
  value: number;
}

export const DiscountBadge = ({
  value,
}: DiscountBadgeProps) => {

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 1,
        right: 1,
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
        px: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="caption">
        {
          `- ${value}%`
        }
      </Typography>
    </Box>
  );
}