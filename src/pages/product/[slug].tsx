import { InnerContainer } from 'components/inner-container';
import NoResultFound from 'components/no-result/no-result';
import { SEO } from 'components/Seo';
import { ProductContent } from 'features/product-content';
import { useProductBySlug } from 'hooks';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { productsRepository } from 'repository/productsRepository';
import { GetProductDto } from 'types/dtos';

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  let productSlugs: string[] = [];
  try {
    const products = await productsRepository.getBestSellerProducts({});
    productSlugs = products.map(p => p.slug);
  } catch (error) {

  }
  // Get the paths we want to pre-render based on categories
  const paths = productSlugs.map(slug => ({
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
  productSlug: string,
  productPrerenderedData: GetProductDto | null,
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps, DynamicPageProps> = async ({ params }) => {
  const { slug = "" } = params!;
  // params contains the product `slug`.
  // If the route is like /product/1, then params.slug is 1
  let product: GetProductDto | null = null;
  try {
    product = await productsRepository.getProductBySlug({
      idOrSlug: slug
    });
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      productSlug: slug,
      productPrerenderedData: product,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const ProductPage = ({ productSlug, productPrerenderedData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();
  const { data: productData, loading } = useProductBySlug({
    idOrSlug: productSlug,
    initialData: productPrerenderedData,
  });

  const isLoading = isFallback || loading;

  return (
    <InnerContainer>
      {
        isLoading ?
          <SEO title="Cargando producto" description="Cargando información del producto." />
          :
          productData === null ?
            <SEO title="Producto no encontrado" description="Lo sentimos, este enlace aparentemente está roto." />
            :
            <SEO
              title={productData!.title}
              description={productData!.description}
            />
      }
      {
        !isLoading && productData === null ?
          <NoResultFound />
          :
          productData ?
            <ProductContent
              productInfo={productData}
            />
            :
            //skeleton here
            null
      }
    </InnerContainer>
  );
};

export default ProductPage;