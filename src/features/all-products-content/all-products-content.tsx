import { categoryDefaultNames } from "@constants";
import { Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { LeftFilterContainer } from "components/left-filter-container";
import { ProductFilterProvider } from "context/product-filter";
import { FilterButtonMobile, FilterPriceRange, FilterSearchBox, SubcategoryFilter } from "features/product-filter";
import { useAllSubcategories } from "hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { GetProductDto, GetSubcategoriesDto, PagedDto } from "types/dtos";
import { AllProductsProductList } from ".";

export type AllProductsContentProps = {
  productList?: PagedDto<GetProductDto> | null;
  subcategoryList?: GetSubcategoriesDto[];
}

const InnerAllProductsContent = ({ productList, subcategoryList }: AllProductsContentProps) => {
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
          <FormattedMessage
            id="category.todos-productos"
            defaultMessage={categoryDefaultNames["todos-productos"]}
          />
        </Typography>
        {
          isMobile &&
          <FilterButtonMobile>
            <FilterContent
              subcategoryInitialData={subcategoryList}
            />
          </FilterButtonMobile>
        }
      </Grid>
      {
        !isMobile &&
        <Grid item sm={4} md={3}>
          <FilterContent
            subcategoryInitialData={subcategoryList}
          />
        </Grid>
      }
      <Grid item xs>
        <AllProductsProductList
          initialData={productList}
        />
      </Grid>
    </Grid>
  );
}

export type FilterContentProps = {
  subcategoryInitialData?: GetSubcategoriesDto[];
}

const FilterContent = ({ subcategoryInitialData }: FilterContentProps) => {
  const { data: subcategoryList, } = useAllSubcategories({ initialData: subcategoryInitialData });
  return (
    <LeftFilterContainer>
      <Typography variant="h5">
        <FormattedMessage id="fiilter.title" defaultMessage="Filtros" />
      </Typography>
      <SubcategoryFilter
        subcategoryList={subcategoryList}
      />
      <FilterSearchBox />
      <FilterPriceRange />
    </LeftFilterContainer>
  )
}

export const AllProductsContent = (props: AllProductsContentProps) => {
  return (
    <ProductFilterProvider>
      <InnerAllProductsContent {...props} />
    </ProductFilterProvider>
  );
}