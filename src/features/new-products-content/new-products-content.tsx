import { Grid, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import { ProductFilterProvider } from "context/product-filter";
import { FilterButtonMobile, FilterPriceRange, FilterSearchBox } from "features/product-filter";
import React from "react";
import { FormattedMessage } from "react-intl";
import { GetProductDto, PagedDto } from "types/dtos";
import { NewProductsList } from ".";

export type NewProductsContentProps = {
  productList?: PagedDto<GetProductDto> | null;
}

const InnerNewProductsContent = ({ productList, }: NewProductsContentProps) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item container xs={12} direction="column" alignItems="center" sx={{ mb: 1 }}>
        <Typography
          variant="h5"
          color="secondary"
          textAlign="center"
          sx={{
            textTransform: "uppercase",
          }}
        >
          <FormattedMessage id="newProducts.title" defaultMessage="Productos nuevos" />
        </Typography>
        {
          isMobile &&
          <FilterButtonMobile />
        }
      </Grid>
      {
        !isMobile &&
        <Grid item sm={4} md={3}>
          <Stack
            direction="column"
            spacing={1}
            sx={{
              p: 2,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText'
            }}
          >
            <Typography variant="h5">
              <FormattedMessage id="fiilter.title" defaultMessage="Filtros" />
            </Typography>
            <FilterSearchBox />
            <FilterPriceRange />
          </Stack>
        </Grid>
      }
      <Grid item xs>
        <NewProductsList
          initialData={productList}
        />
      </Grid>
    </Grid>
  );
}

export const NewProductsContent = (props: NewProductsContentProps) => {
  return (
    <ProductFilterProvider>
      <InnerNewProductsContent {...props} />
    </ProductFilterProvider>
  );
}