import { Box } from '@mui/material';
import { BoxProps } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type InnerContainerProps = BoxProps & {
}

export const InnerContainer = ({ children, ...restBoxProps }: PropsWithChildren<InnerContainerProps>) => {
  return (
    <Box
      sx={{
        py: {
          xs: 1,
          md: 3,
        },
        height: '100%'
      }}
      {...restBoxProps}
    >
      {
        children
      }
    </Box>
  );
}