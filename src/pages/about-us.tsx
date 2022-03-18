import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { aboutUs } from "assets/img/images";
import { SEO } from "components";
import Image from "components/image/image";
import { InnerContainer } from "components/inner-container";
import { RadiColorLogo } from "components/radi-color-logo";
import CompanyInfoContent from "features/company-info-content/company-info-content";
import { useCompanyAboutUs } from "hooks/use-company-information";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { Fragment } from "react";
import { companyRepository } from "repository";
import { CompanyInfoDto } from "types/dtos";

type ServerSideProps = {
  aboutUsPrerendered: CompanyInfoDto | null,
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps> = async () => {
  let aboutUs: CompanyInfoDto | null = null;
  try {
    aboutUs = await companyRepository.getAboutUs();
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      aboutUsPrerendered: aboutUs,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const AboutUsPage = ({ aboutUsPrerendered }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useCompanyAboutUs({ initialData: aboutUsPrerendered });

  return (
    <Fragment>
      <SEO title="Quienes somos" description="Somos una empresa familiar, con el objetivo principal de dar el mejor precio posible en las necesidades básicas del hogar a nuestros clientes." />
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
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
        >
          Quienes somos
        </Typography>
        <Grid container>
          <Grid
            item
            md
            xs={12}
            sx={{
              position: 'relative'
            }}
            height={{
              xs: "25vh",
              md: "auto",
            }}
          >
            <Image src={aboutUs} alt={"Logo"} layout="fill" objectFit="cover" />
          </Grid>
          <Grid
            item
            md
            xs={12}
            textAlign="justify"
            p={2}
          >
            <CompanyInfoContent data={data} />
          </Grid>
        </Grid>
      </Stack>
    </Fragment>
  );
}

export default AboutUsPage;