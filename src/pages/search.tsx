import { DEFAULT_PAGE_SIZE } from "@constants";
import { Pagination, Stack } from "@mui/material";
import { SEO } from "components";
import { InnerContainer } from "components/inner-container";
import NoResultFound from "components/no-result/no-result";
import { useProducts } from "hooks";
import { useRouter } from "next/router";
import { ProductList } from "product-list";
import React, { useState } from "react";

export default function SearchPage() {
  const { isFallback, query: { q } } = useRouter();
  const [page, setPage] = useState(1);

  const { data: productData, loading } = useProducts({
    page: page,
    pageSize: DEFAULT_PAGE_SIZE,
    search: q as string,
  });
  const isLoading = isFallback || loading;

  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <InnerContainer>
      {
        isLoading ?
          <SEO title="Cargando productos" description="Cargando productos que coincidan con la busqueda." />
          :
          <SEO
            title="Resultados de busqueda"
            description="Productos que coinciden con la busqueda."
          />
      }
      {
        !isLoading && !productData?.data.length ?
          <NoResultFound />
          :
          <Stack direction="column" spacing={2} alignItems="center" width="100%">
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
      }
    </InnerContainer>
  );
}
