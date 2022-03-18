import { InnerContainer } from 'components/inner-container';
import { SEO } from 'components/Seo';
import { DEFAULT_PAGE_SIZE } from 'constants/pagination';
import { AllProductsContent } from 'features/all-products-content';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { categoriesRepository } from 'repository';
import { productsRepository } from 'repository/productsRepository';
import { GetProductDto, GetSubcategoriesDto, PagedDto } from 'types/dtos';

type DynamicPageProps = {
  slug: string,
}

type ServerSideProps = {
  productListPrerenderendData: PagedDto<GetProductDto> | null,
  subcategoriesPrerenderedData: GetSubcategoriesDto[],
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps, DynamicPageProps> = async () => {

  let categoryProducts: PagedDto<GetProductDto> | null = null;
  let subcategories: GetSubcategoriesDto[] = [];
  try {
    categoryProducts = await productsRepository.getProducts({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  } catch (e) {

  }
  try {
    subcategories = await categoriesRepository.getAllSubcategories();
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      productListPrerenderendData: categoryProducts,
      subcategoriesPrerenderedData: subcategories,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const ProductsPage = ({ productListPrerenderendData, subcategoriesPrerenderedData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <InnerContainer>
      <SEO title="Productos" description="Todos nuestros productos." />
      <AllProductsContent
        productList={productListPrerenderendData}
        subcategoryList={subcategoriesPrerenderedData}
      />
    </InnerContainer>
  );
};

export default ProductsPage;