import { Add, Remove } from "@mui/icons-material";
import { Button, ButtonProps, Stack, StackProps, Typography } from "@mui/material";
import { CartItemBaseInfo, useCart } from "context/cart";
import React from "react";
import { FormattedMessage } from "react-intl";

const CounterButton = (props: ButtonProps) => (
  <Button
    variant="outlined"
    size="small"
    sx={{
      minWidth: 'auto'
    }}
    {...props}
  />
)

export type AddToCartButtonProps = {
  productInfo: CartItemBaseInfo;
  counterProps?: StackProps;
}

export const AddToCartButton = ({
  productInfo,
  counterProps = {
    direction: 'row',
    spacing: 2,
  },
}: AddToCartButtonProps) => {
  const { addItem, getItemAdded, removeItem } = useCart();
  const itemAdded = getItemAdded(productInfo);

  const handleAdd = () => {
    addItem(productInfo);
  }

  const handleRemove = () => {
    removeItem(productInfo);
  }

  return itemAdded ?
    <Stack
      alignItems="center"
      {...counterProps}
    >
      <CounterButton
        onClick={handleRemove}
      >
        <Remove fontSize="small" />
      </CounterButton>
      <Typography variant="subtitle2">
        {
          itemAdded.quantity
        }
      </Typography>
      <CounterButton
        onClick={handleAdd}
        disabled={itemAdded.quantity === productInfo.stock}
      >
        <Add fontSize="small" />
      </CounterButton>
    </Stack>
    :
    <Button variant="contained"
      sx={{
        borderRadius: 0,
      }}
      onClick={handleAdd}
    >
      <FormattedMessage id="addToCart.text" defaultMessage="Agregar al carrito" />
    </Button>
}