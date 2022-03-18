import { InnerContainer } from 'components/inner-container';
import { SEO } from 'components/Seo';
import { DEFAULT_PAGE_SIZE } from 'constants/pagination';
import { NewProductsContent } from 'features/new-products-content';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import { productsRepository } from 'repository/productsRepository';
import { GetProductDto, PagedDto } from 'types/dtos';

type DynamicPageProps = {
}

type ServerSideProps = {
  prerenderedData: PagedDto<GetProductDto> | null,
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps, DynamicPageProps> = async () => {
  // params contains the category `slug`.
  // If the route is like /category/1, then params.slug is 1
  let offerProducts: PagedDto<GetProductDto> | null = null;
  try {
    offerProducts = await productsRepository.getNewProducts({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      prerenderedData: offerProducts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const NewProductsPage = ({ prerenderedData, }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { formatMessage } = useIntl();

  return (
    <InnerContainer>
      <SEO
        title={
          formatMessage({
            id: 'SEO.newProducts.title',
            defaultMessage: 'Productos nuevos.',
          })
        }
        description={
          `${formatMessage({
            id: 'SEO.newProducts.description',
            defaultMessage: 'Listado de productos nuevos.',
          })}`
        }
      />
      <NewProductsContent
        productList={prerenderedData}
      />
    </InnerContainer>
  );
};

export default NewProductsPage;