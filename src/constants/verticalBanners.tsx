import { Box, Typography } from "@mui/material";
import { Covid19Image, NewProductsImage, OfferProductsImage, RecipesImage } from "assets/img/vertical-banners";
import { VerticalBannerProps } from "components/vertical-banner";
import React from "react";
import { COVID19_PAGE, NEW_PRODUCTS_PAGE, OFFER_PRODUCTS_PAGE, RECIPES_PAGE } from "site/navigation";

export const verticalBanners: VerticalBannerProps[] = [
  {
    imgUrl: OfferProductsImage,
    topComponent: (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          color="white"
          fontFamily="panton"
        >
          Ofertas de la
        </Typography>
        <Typography variant="h3" color="white">
          Semana
        </Typography>
      </Box>
    ),
    href: OFFER_PRODUCTS_PAGE,
  },
  {
    imgUrl: NewProductsImage,
    topComponent: (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          color="white"
          fontFamily="panton"
        >
          Productos
        </Typography>
        <Typography variant="h3" color="white">
          Nuevos
        </Typography>
      </Box>
    ),
    href: NEW_PRODUCTS_PAGE,
  },
  {
    imgUrl: RecipesImage,
    topComponent: (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" color="white">
          Inspírate
        </Typography>
        <Typography
          variant="h4"
          color="white"
          fontFamily="panton"
        >
          Con nuestras deliciosas recetas
        </Typography>
      </Box>
    ),
    href: RECIPES_PAGE,
  },
  {
    imgUrl: Covid19Image,
    topComponent: (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          color="black"
          fontFamily="panton"
        >
          Conoce nuestras medidas para protegernos del
        </Typography>
      </Box>
    ),
    bottomComponent: (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" color="white">
          Covid 19
        </Typography>
        <Typography
          variant="h4"
          color="black"
          fontFamily="panton"
        >
          En nuestro establecimiento
        </Typography>
      </Box>
    ),
    href: COVID19_PAGE,
  },
]

























