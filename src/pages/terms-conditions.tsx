import { Stack } from '@mui/material';
import { SEO } from 'components';
import { InnerContainer } from 'components/inner-container';
import { RadiColorLogo } from 'components/radi-color-logo';
import CompanyInfoContent from 'features/company-info-content/company-info-content';
import { useCompanyTermsConditions } from 'hooks/use-company-information';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { Fragment } from 'react';
import { companyRepository } from 'repository';
import { CompanyInfoDto } from 'types/dtos';

type ServerSideProps = {
  TermsConditionsPrerendered: CompanyInfoDto | null,
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps> = async () => {
  let TermsConditions: CompanyInfoDto | null = null;
  try {
    TermsConditions = await companyRepository.getPrivacyPolices();
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      TermsConditionsPrerendered: TermsConditions,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const TermsConditionsPage = ({ TermsConditionsPrerendered }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useCompanyTermsConditions({ initialData: TermsConditionsPrerendered });

  return (
    <Fragment>
      <SEO title="Términos y condiciones" description="Nuestros términos y condiciones" />
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

export default TermsConditionsPage;