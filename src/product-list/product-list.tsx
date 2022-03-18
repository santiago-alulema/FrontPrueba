import { DEFAULT_PAGE_SIZE } from "@constants";
import { Grid, Skeleton, Stack } from "@mui/material";
import NoResultFound from "components/no-result/no-result";
import { ProductCard } from "components/product-card";
import React from "react";
import { GetProductDto } from "types/dtos";
import { createArrayFilled } from "utils";

export type ProductListProps = {
  productList?: GetProductDto[] | null;
}

export const ProductList = ({ productList }: ProductListProps) => {

  return (
    productList ?
      productList.length ?
        <Grid container spacing={2} paddingX={2}>
          {
            productList.map(({ id, slug, title, images, price, discount, taxPercent, stock }) => (
              <Grid
                key={id}
                item
                xs={6}
                sm={4}
                lg={3}
              >
                <ProductCard
                  id={id}
                  slug={slug}
                  title={title}
                  imageList={images}
                  originalPrice={price}
                  discount={discount}
                  taxPercent={taxPercent}
                  stock={stock}
                />
              </Grid>
            ))
          }
        </Grid>
        :
        <NoResultFound />
      :
      <Grid container spacing={2} paddingX={2}>
        {
          createArrayFilled(DEFAULT_PAGE_SIZE).map(
            (i) => (
              <Grid
                key={i}
                item
                xs={6}
                sm={4}
                lg={3}
              >
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton variant="rectangular" width="100%" height="1em" />
                  <Skeleton variant="rectangular" width="100%" height="2em" />
                </Stack>
              </Grid>
            ))
        }
      </Grid>
  );
}