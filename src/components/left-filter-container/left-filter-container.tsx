import { Stack } from "@mui/material";
import React, { PropsWithChildren } from "react";

export type LeftFilterContainerProps = {
}

export const LeftFilterContainer = ({ children }: PropsWithChildren<LeftFilterContainerProps>) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        p: 2,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      {children}
    </Stack>
  );
}
