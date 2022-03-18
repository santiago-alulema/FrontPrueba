import { IconButtonProps, Stack, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { CartDrawer } from "components/cart-drawer";
import { CartIconButton } from "components/cart-icon-button";
import { LoginIconButton } from "components/login-icon-button";
import React from "react";

type RightMenuProps = {
  iconColor?: IconButtonProps['color'],
  sx?: SxProps<Theme>,
}

export const RightMenu = ({ iconColor = "primary", sx }: RightMenuProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={sx}
    >
      <LoginIconButton iconColor={iconColor} />
      <CartIconButton iconColor={iconColor} />
      <CartDrawer />
    </Stack>
  );
}