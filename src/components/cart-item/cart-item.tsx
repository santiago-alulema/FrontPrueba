import { Delete } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Stack, Theme, Typography } from "@mui/material";
import NoImage from 'assets/noImage.svg';
import { AddToCartButton } from "components/add-to-cart-button";
import Image from "components/image/image";
import { CartItemInfoState } from "context/cart";
import React from "react";

type CartItemProps = {
  item: CartItemInfoState,
  onRemoveItem: (item: CartItemInfoState) => void;
}

export const CartItem = ({
  item,
  onRemoveItem,
}: CartItemProps) => {
  const {
    image,
    name,
    totalPrice,
  } = item;

  const handleRemoveItem = () => {
    onRemoveItem(item);
  }

  return (
    <Card
      sx={{
        overflow: 'unset',
        position: 'relative',
        width: '100%',
      }}
    >
      <CardContent
        sx={{
          p: (theme: Theme) => `${theme.spacing(1)} !important`
        }}
        component={Stack}
        direction="row"
        spacing={1}
      >
        <Box
          sx={{
            position: "relative",
            width: 90,
            height: 90,
          }}
        >
          <Image
            src={image ?? NoImage}
            alt={`${name} cart thumb`}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Stack
          sx={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">
            {
              `${name}`
            }
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="secondary" noWrap>
            {
              `$ ${totalPrice.toFixed(2)}`
            }
          </Typography>
        </Stack>
        <AddToCartButton
          productInfo={item}
          counterProps={{
            direction: 'column',
            spacing: 1,
            alignSelf: 'center'
          }}
        />
      </CardContent>
      <IconButton
        aria-label="delete"
        onClick={handleRemoveItem}
        sx={{
          opacity: 0.8,
          '&:hover': {
            opacity: 1,
          },
          position: 'absolute',
          zIndex: 1,
          top: 0,
        }}
        size="small"
        color="error"
      >
        <Delete />
      </IconButton>
    </Card>
  );
}