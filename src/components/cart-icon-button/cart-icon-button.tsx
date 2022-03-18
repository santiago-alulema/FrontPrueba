import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton, IconButtonProps } from "@mui/material";
import { useCart } from "context/cart";
import React from "react";

type CartIconButtonProps = {
  iconColor?: IconButtonProps['color'],
}

export const CartIconButton = ({ iconColor = "primary" }: CartIconButtonProps) => {
  const { cartItemsCount, toggleCart } = useCart();
  return (
    <IconButton aria-label="cart" size="small" color={iconColor} onClick={toggleCart}>
      <Badge
        badgeContent={cartItemsCount}
        color="secondary"
      >
        <ShoppingCart fontSize="medium" />
      </Badge>
    </IconButton>
  );
}