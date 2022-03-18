import { categorySlug } from '@constants';
import { InnerContainer } from 'components/inner-container';
import NoResultFound from 'components/no-result/no-result';
import { SEO } from 'components/Seo';
import { DEFAULT_PAGE_SIZE } from 'constants/pagination';
import { CategoryContent } from 'features/category-content';
import { useProductsByCategory } from 'hooks';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import { categoriesRepository } from 'repository';
import { productsRepository } from 'repository/productsRepository';
import { GetProductDto, GetSubcategoriesDto, PagedDto } from 'types/dtos';

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on categories
  const paths = categorySlug.map(slug => ({
    params: { slug },
  }));

  return {
    // We'll pre-render only these paths at build time.
    paths,
    // Enable statically generating additional pages for new categories added after build time
    fallback: true,
  }
}

type DynamicPageProps = {
  slug: string,
}

type ServerSideProps = {
  categorySlug: string,
  categoryPrerenderedData: PagedDto<GetProductDto> | null,
  subcategoriesPrerenderedData: GetSubcategoriesDto[],
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps, DynamicPageProps> = async ({ params }) => {
  const { slug = "" } = params!;
  // params contains the category `slug`.
  // If the route is like /category/1, then params.slug is 1
  let categoryProducts: PagedDto<GetProductDto> | null = null;
  let subcategories: GetSubcategoriesDto[] = [];
  try {
    categoryProducts = await productsRepository.getProductsByCategory({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      idOrSlug: slug
    });
  } catch (e) {

  }
  try {
    subcategories = await categoriesRepository.getSubcategories({
      idOrSlug: slug
    });
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      categorySlug: slug,
      categoryPrerenderedData: categoryProducts,
      subcategoriesPrerenderedData: subcategories,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const CategoryPage = ({ categorySlug, categoryPrerenderedData, subcategoriesPrerenderedData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();
  const { formatMessage } = useIntl();
  const { data: categoryProductsData, loading } = useProductsByCategory({
    idOrSlug: categorySlug,
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    initialData: categoryPrerenderedData,
  });
  const isLoading = isFallback || loading;

  return (
    <InnerContainer>
      {
        isLoading ?
          <SEO title="Cargando categoría" description="Cargando producto de la categoría." />
          :
          categoryProductsData === null ?
            <SEO title="Categoría no encontrada" description="Lo sentimos, este enlace aparentemente está roto." />
            :
            <SEO
              title={
                formatMessage({
                  id: `category.${categorySlug}`,
                  defaultMessage: 'Categoría desconocida.',
                })
              }
              description={
                `${formatMessage({
                  id: `category.${categorySlug}`,
                  defaultMessage: 'Categoría desconocida.',
                })}`
              }
            />
      }
      {
        !isLoading && categoryProductsData === null ?
          <NoResultFound />
          :
          <CategoryContent
            slug={categorySlug}
            productList={categoryProductsData}
            subcategoryList={subcategoriesPrerenderedData}
          />
      }
    </InnerContainer>
  );
};

export default CategoryPage;