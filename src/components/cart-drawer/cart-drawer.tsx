import { Close, ShoppingCartCheckout } from "@mui/icons-material";
import { Button, Divider, Drawer, IconButton, Stack, StackProps, Theme, Typography } from "@mui/material";
import { EmptyCartIcon } from "assets/icons";
import { CartItem } from "components/cart-item";
import Link from "components/Link";
import { useCart } from "context/cart";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CHECKOUT_PAGE } from "site/navigation";

const CartListContainer = (props: StackProps) => (
  <Stack
    spacing={2}
    sx={{
      p: 1,
      overflowY: 'auto',
      background: (theme: Theme) => theme.palette.grey[100],
    }}
    alignItems="center"
    flex={1}
    {...props}
  />
)

type CartDrawerProps = {
}

export const CartDrawer = ({ }: CartDrawerProps) => {
  const {
    isOpen,
    items,
    clearCart,
    getCartTotal,
    toggleCart,
    getTotalQuantity,
    removeItemFromCart
  } = useCart();

  const handleGoCheckoutClick = () => {
    toggleCart();
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleCart}
      PaperProps={{
        sx: {
          width: '300px',
        }
      }}
    >
      <Stack justifyContent="space-between" direction="row" p={1}>
        <IconButton
          aria-label="close"
          onClick={toggleCart}
          size="small"
        >
          <Close />
        </IconButton>
        <Typography variant="h6" color="primary" fontWeight="bold">
          <FormattedMessage
            id="cart.title"
            defaultMessage="Mi carrito"
          />
        </Typography>
        <Typography variant="h6" color="secondary">
          <FormattedMessage
            id="cart.totalItems.text"
            defaultMessage="{quantity} Item(s)"
            values={{
              quantity: getTotalQuantity()
            }}
          />
        </Typography>
      </Stack>
      <Divider />
      {
        items.length > 0 ?
          <CartListContainer>
            <Button
              variant="text"
              onClick={clearCart}
            >
              <FormattedMessage
                id="cart.clear"
                defaultMessage="Limpiar carrito"
              />
            </Button>
            {
              items.map(i => (
                <CartItem
                  key={i.id}
                  item={i}
                  onRemoveItem={removeItemFromCart}
                />
              ))
            }
          </CartListContainer>
          :
          <CartListContainer
            justifyContent="center"
          >
            <EmptyCartIcon
              sx={{
                height: "auto",
                width: "80%",
              }}
            />
            <Typography
              variant="h5"
              color="secondary"
              sx={{
                textTransform: "uppercase",
              }}
              fontFamily="panton"
              textAlign="center"
            >
              <FormattedMessage
                id="emptyCart.text"
                defaultMessage="El carrito está vacío"
              />
            </Typography>
          </CartListContainer>
      }
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography variant="h6" fontWeight="bold">
          <FormattedMessage
            id="order.total.text"
            defaultMessage="Total"
          />
        </Typography>
        <Typography variant="h6" color="secondary" fontWeight="bold">
          {
            `$${getCartTotal().toFixed(2)}`
          }
        </Typography>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={CHECKOUT_PAGE}
          onClick={handleGoCheckoutClick}
          startIcon={<ShoppingCartCheckout />}
          color="secondary"
          disabled={items.length === 0}
        >
          <FormattedMessage
            id="goToCheckout.text"
            defaultMessage="Checkout"
          />
        </Button>
      </Stack>
    </Drawer>
  );
}