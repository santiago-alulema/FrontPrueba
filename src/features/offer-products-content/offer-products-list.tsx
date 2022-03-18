import { DEFAULT_PAGE_SIZE, priceRanges } from "@constants";
import { Pagination, Stack } from "@mui/material";
import { useProductFilter } from "context/product-filter";
import { useOfferProducts } from "hooks";
import { ProductList } from "product-list";
import React, { useState } from "react";
import { GetProductDto, PagedDto } from "types/dtos";

export type OfferProductsListProps = {
  initialData?: PagedDto<GetProductDto> | null;
}

export const OfferProductsList = ({ initialData }: OfferProductsListProps) => {
  const [page, setPage] = useState(1);
  const {
    priceRangeIndex,
    searchQuery,
  } = useProductFilter();

  const priceRange = typeof priceRangeIndex === 'number' ? priceRanges[priceRangeIndex] : undefined;

  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data: productData, } = useOfferProducts({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    search: searchQuery !== null ? searchQuery : undefined,
    priceMin: priceRange?.priceMin,
    priceMax: priceRange?.priceMax,
    initialData: initialData !== null ? initialData : undefined,
  });

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <ProductList productList={productData?.data} />
      {
        productData && productData.totalCount > 0 &&
        <Pagination
          color="primary"
          count={productData.totalPages}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      }
    </Stack>
  );
}