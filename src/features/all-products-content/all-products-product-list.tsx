import { DEFAULT_PAGE_SIZE, priceRanges } from "@constants";
import { Pagination, Stack } from "@mui/material";
import { useProductFilter } from "context/product-filter";
import { useProducts } from "hooks";
import { ProductList } from "product-list";
import React, { useState } from "react";
import { GetProductDto, PagedDto } from "types/dtos";

export type AllProductsProductListProps = {
  initialData?: PagedDto<GetProductDto> | null;
}

export const AllProductsProductList = ({ initialData }: AllProductsProductListProps) => {
  const [page, setPage] = useState(1);
  const {
    subcategories,
    priceRangeIndex,
    searchQuery,
  } = useProductFilter();

  const priceRange = typeof priceRangeIndex === 'number' ? priceRanges[priceRangeIndex] : undefined;

  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data: productData, } = useProducts({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    subCategoryId: subcategories,
    search: searchQuery !== null ? searchQuery : undefined,
    priceMin: priceRange?.priceMin,
    priceMax: priceRange?.priceMax,
    initialData: initialData !== null ? initialData : undefined,
  });

  return (
    <Stack direction="column" spacing={2} alignItems="center" height="100%">
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