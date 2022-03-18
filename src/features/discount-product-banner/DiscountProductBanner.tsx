
import { Grid, Skeleton, Typography } from '@mui/material';
import { NoImage } from 'assets/images';
import { AddToCartButton } from 'components/add-to-cart-button';
import Image from 'components/image/image';
import { CartItemBaseInfo } from 'context/cart';
import { calculateProductPriceVariation, useOfferProducts } from 'hooks';
import React from 'react';
import { GetProductDto } from 'types/dtos';

export const DiscountProductBanner = () => {
  const { data: productData, loading } = useOfferProducts({
    page: 1,
    pageSize: 1,
  });

  const productInfo = productData?.data[0];

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        height: '100%',
        backgroundColor: '#f5f2e9',
        p: 2,
      }}
      alignItems="center"
    >
      <Grid
        item
        container
        xs={8}
        sm={7}
        md={6}
        sx={{
          textAlign: 'center',
        }}
        alignItems="center"
        direction="column"
      >
        <Typography
          variant="h3"
          color="black"
          sx={{
            transform: "rotate(-10deg)",
          }}
        >
          Ahorra ya!
        </Typography>
        <Typography
          variant="h5"
          color="black"
          fontFamily="panton"
          sx={{
            transform: "rotate(-10deg)",
          }}
        >
          PRODUCTO EN
        </Typography>
        <Typography
          variant="h5"
          color="secondary"
          fontFamily="panton"
          sx={{
            transform: "rotate(-10deg)",
            marginBottom: 3
          }}
        >
          DESCUENTO
        </Typography>
        {
          loading ?
            <Skeleton height={40} />
            :
            productInfo ?
              <AddProuctToCartButton productInfo={productInfo} />
              :
              null
        }
      </Grid>
      {
        productInfo &&
        <Grid
          item
          sx={{
            position: 'relative',
          }}
          xs
          alignSelf="stretch"
        >
          <Image
            src={productInfo.images[0] ?? NoImage}
            alt={productInfo.title}
            layout="fill"
            objectFit="contain"
            priority
          />
        </Grid>
      }
    </Grid>
  );
}

type AddProuctToCartButtonProps = {
  productInfo: GetProductDto
}

const AddProuctToCartButton = ({ productInfo }: AddProuctToCartButtonProps) => {

  const {
    id,
    slug,
    title,
    images,
    price,
    discount,
    taxPercent,
    stock,
  } = productInfo;

  const { salePriceDisplay } = calculateProductPriceVariation({
    basePrice: price,
    taxPercent: taxPercent,
    discount: discount,
  });

  const imageToShow = images[0];

  const cartInfo: CartItemBaseInfo = {
    id,
    slug,
    name: title,
    image: imageToShow,
    price,
    discountPercent: discount,
    salePrice: +salePriceDisplay,
    taxPercent: taxPercent,
    stock,
  }

  return <AddToCartButton productInfo={cartInfo} />
}