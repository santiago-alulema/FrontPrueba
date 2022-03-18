import { Stack } from '@mui/material';
import { SEO } from 'components';
import { InnerContainer } from 'components/inner-container';
import { RadiColorLogo } from 'components/radi-color-logo';
import CompanyInfoContent from 'features/company-info-content/company-info-content';
import { useCompanyDevolutions } from 'hooks/use-company-information';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { Fragment } from 'react';
import { companyRepository } from 'repository';
import { CompanyInfoDto } from 'types/dtos';

type ServerSideProps = {
  devolutionsPrerendered: CompanyInfoDto | null,
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps> = async () => {
  let devolutions: CompanyInfoDto | null = null;
  try {
    devolutions = await companyRepository.getPrivacyPolices();
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      devolutionsPrerendered: devolutions,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const DevolutionsPage = ({ devolutionsPrerendered }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useCompanyDevolutions({ initialData: devolutionsPrerendered });

  return (
    <Fragment>
      <SEO title="Politicas de devoluciones" description="Nuestras políticas de devoluciones" />
      <Stack
        direction="column"
        spacing={2}
        width={{
          xs: '90%',
          sm: '80%',
        }}
        alignItems="center"
        mx="auto"
        component={InnerContainer}
      >
        <RadiColorLogo />
        <CompanyInfoContent data={data} />
      </Stack>
    </Fragment>
  )
}

export default DevolutionsPage;