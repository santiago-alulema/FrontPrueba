import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import NoImage from 'assets/noImage.svg';
import { AddToCartButton } from "components/add-to-cart-button";
import { DiscountBadge } from "components/discount-badge";
import Image from "components/image/image";
import { PriceWithDiscount } from "components/price-with-discount";
import { Thumb } from "components/thumb";
import { CartItemBaseInfo } from "context/cart";
import { calculateProductPriceVariation } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { categoryPageBySlug } from "site/navigation";
import { CategorySlugType } from "types";
import { GetProductDto } from "types/dtos";

export type ProductContentProps = {
  productInfo: GetProductDto;
}

export const ProductContent = ({
  productInfo: {
    title,
    description,
    id,
    slug,
    images,
    price,
    discount,
    taxPercent,
    categories,
    stock,
  }
}: ProductContentProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const { push } = useRouter();

  const { salePriceDisplay } = calculateProductPriceVariation({
    basePrice: price,
    taxPercent: taxPercent,
    discount: discount,
  });

  const productInfo: CartItemBaseInfo = {
    id,
    slug,
    name: title,
    image: images[0],
    price,
    discountPercent: discount,
    salePrice: +salePriceDisplay,
    taxPercent: taxPercent,
    stock,
  }

  const handleCategoryClick = (categorySlug: CategorySlugType) => {
    push(categoryPageBySlug(categorySlug));
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item container direction="column" xs="auto" spacing={1} justifyContent="center">
        {
          images.length ?
            images.map((imgUrl, i) => (
              <Grid
                key={i}
                item
              >
                <Thumb
                  src={imgUrl}
                  alt={`${title} thumb`}
                  selected={imageIndex === i}
                  onClick={() => setImageIndex(i)}
                />
              </Grid>
            ))
            :
            <Grid
              item
            >
              <Thumb
                src={NoImage}
                alt="no image thumb"
              />
            </Grid>

        }
      </Grid>
      <Grid
        item
        xs
        sm={5}
        lg={6}
        xl={7}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '50vh',
          }}
        >
          <Image
            src={images[imageIndex] ?? NoImage}
            alt={`${title} image`}
            layout="fill"
            objectFit="contain"
          />
          {
            discount > 0 &&
            <DiscountBadge value={discount} />
          }
        </Box>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm
        alignSelf="center"
        spacing={2}
        direction="column"
        alignItems="center"
      >
        <Grid item component={Typography} variant="h4" color="primary">
          {
            title
          }
        </Grid>
        <Stack component={Grid} item spacing={2} direction="row">
          {
            categories.map(c => (
              <Chip
                key={c}
                label={
                  <FormattedMessage id={`category.${c}`} defaultMessage={c} />
                }
                onClick={() => handleCategoryClick(c)}
              />
            ))
          }
        </Stack>
        <Grid item component={Typography} variant="body1">
          {
            description
          }
        </Grid>
        <Grid
          item
        >
          <PriceWithDiscount
            price={price}
            discount={discount}
            taxPercent={taxPercent}
          />
        </Grid>
        <Grid item>
          <AddToCartButton productInfo={productInfo} />
        </Grid>
      </Grid>
    </Grid >
  );
}
