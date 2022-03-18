import { categoryDefaultNames } from "@constants";
import { Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { LeftFilterContainer } from "components/left-filter-container";
import { ProductFilterProvider } from "context/product-filter";
import { FilterButtonMobile, FilterPriceRange, FilterSearchBox, SubcategoryFilter } from "features/product-filter";
import { useSubcategories } from "hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CategorySlugType } from "types";
import { GetProductDto, GetSubcategoriesDto, PagedDto } from "types/dtos";
import { CategoryProductList } from ".";

export type CategoryContentProps = {
  slug: string,
  productList?: PagedDto<GetProductDto> | null;
  subcategoryList?: GetSubcategoriesDto[];
}

const InnerCategoryContent = ({ slug, productList, subcategoryList }: CategoryContentProps) => {
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
          <FormattedMessage id={`category.${slug}`} defaultMessage={categoryDefaultNames[slug as CategorySlugType] ?? 'unknown'} />
        </Typography>
        {
          isMobile &&
          <FilterButtonMobile>
            <FilterContent
              categorySlug={slug}
              subcategoryInitialData={subcategoryList}
            />
          </FilterButtonMobile>
        }
      </Grid>
      {
        !isMobile &&
        <Grid item sm={4} md={3}>
          <FilterContent
            categorySlug={slug}
            subcategoryInitialData={subcategoryList}
          />
        </Grid>
      }
      <Grid item xs>
        <CategoryProductList
          categorySlug={slug}
          initialData={productList}
        />
      </Grid>
    </Grid>
  );
}

export type FilterContentProps = {
  categorySlug: string;
  subcategoryInitialData?: GetSubcategoriesDto[];
}

const FilterContent = ({ categorySlug, subcategoryInitialData }: FilterContentProps) => {
  const { data: subcategoryList, } = useSubcategories({ idOrSlug: categorySlug, initialData: subcategoryInitialData });
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

export const CategoryContent = (props: CategoryContentProps) => {
  return (
    <ProductFilterProvider>
      <InnerCategoryContent {...props} />
    </ProductFilterProvider>
  );
}