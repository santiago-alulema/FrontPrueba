import { Box, Stack, Theme, Typography } from "@mui/material";
import { alpha } from "@mui/system";
import { NoImage } from "assets/images";
import { AddToCartButton } from "components/add-to-cart-button";
import { DiscountBadge } from "components/discount-badge";
import Image from "components/image/image";
import Link from "components/Link";
import { CartItemBaseInfo } from "context/cart";
import { calculateProductPriceVariation } from "hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { productPageBySlug } from "site/navigation";

export type ProductCardProps = {
  id: number;
  slug: string;
  title: string;
  imageList: string[];
  originalPrice: number;
  discount: number;
  taxPercent: number;
  stock: number;
}

export const ProductCard = ({
  id,
  slug,
  title,
  imageList,
  originalPrice,
  discount,
  taxPercent,
  stock,
}: ProductCardProps) => {

  const { salePriceDisplay, finalUnitPriceDisplay } = calculateProductPriceVariation({
    basePrice: originalPrice,
    taxPercent: taxPercent,
    discount: discount,
  });

  const imageToShow = imageList[0];

  const productInfo: CartItemBaseInfo = {
    id,
    slug,
    name: title,
    image: imageToShow,
    price: originalPrice,
    discountPercent: discount,
    salePrice: +salePriceDisplay,
    taxPercent: taxPercent,
    stock,
  }

  return (
    <Stack spacing={1} direction="column" alignItems="center">
      <Link
        href={productPageBySlug(slug)}
        color="inherit"
        sx={{
          width: '100%',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.2),
          }
        }}
      >
        <Stack spacing={1} direction="column" alignItems="center">
          <Typography variant="subtitle2" minHeight="3em">
            {title}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              height: 200,
              width: '100%',
            }}
          >
            <Image
              src={imageToShow ?? NoImage}
              alt={`${title} image`}
              layout="fill"
              objectFit="contain"
            />
            {
              discount > 0 &&
              <DiscountBadge value={discount} />
            }
          </Box>
          <Typography variant="subtitle2">
            {
              `$${finalUnitPriceDisplay}`
            }
          </Typography>
        </Stack>
      </Link>
      {
        stock > 0 ?
          <AddToCartButton productInfo={productInfo} />
          :
          <Typography variant="subtitle2" color="secondary">
            <FormattedMessage id="notavailable.text" defaultMessage="No disponible" />
          </Typography>
      }
    </Stack>
  );
}