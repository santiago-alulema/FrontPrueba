import { Stack, Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { faq } from "assets/img/images";
import { SEO } from "components";
import Image from "components/image/image";
import { MobileBanner } from "components/mobile-banner";
import { RadiColorLogo } from "components/radi-color-logo";
import CompanyInfoContent from "features/company-info-content/company-info-content";
import { useCompanyFaqs } from "hooks/use-company-information";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { companyRepository } from "repository";
import { CompanyInfoDto } from "types/dtos";

type ServerSideProps = {
  faqPrerendered: CompanyInfoDto | null,
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<ServerSideProps> = async () => {
  let faq: CompanyInfoDto | null = null;
  try {
    faq = await companyRepository.getPrivacyPolices();
  } catch (e) {

  }
  // Pass post data to the page via props
  return {
    props: {
      faqPrerendered: faq,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

const FaqPage = ({ faqPrerendered }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useCompanyFaqs({ initialData: faqPrerendered });
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Fragment>
      <SEO title="Preguntas y respuestas" description="¿Tienes preguntas? Aquí puedes despejarlas." />
      <Grid
        container
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        justifyContent="space-evenly"
        height="100%"
      >
        {
          isMobile ?
            <Grid item xs={12} p="0 !important">
              <MobileBanner
                img={faq}
                alt="Temas de ayuda"
                intlId="faq.banner.title"
                intlDefault="¿Tienes preguntas?"
                altIntlId="faq.description.text"
                altIntlDefault="AQUÍ PUEDES DESPEJARLAS"
              />
            </Grid>
            :
            <Grid
              item
              container
              md={5}
              direction="column"
              alignSelf="stretch"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={1}>
                <Typography
                  sx={{ transform: "rotate(-10deg)" }}
                  variant="h3"
                  color="secondary"
                >
                  <FormattedMessage
                    id="faq.banner.title"
                    defaultMessage="¿Tienes preguntas?"
                  />
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{
                    transform: "rotate(-10deg)",
                    textTransform: "uppercase",
                  }}
                  fontFamily="panton"
                >
                  <FormattedMessage
                    id="faq.description.text"
                    defaultMessage="AQUÍ PUEDES DESPEJARLAS"
                  />
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  position: 'relative',
                  width: '100%',
                }}
                xs={6}
              >
                <Image
                  src={faq}
                  alt="Temas de ayuda"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="bottom"
                />
              </Grid>
            </Grid>
        }
        <Grid
          item
          xs={12}
          md={7}
        >
          <Stack
            direction="column"
            spacing={2}
            width={{
              xs: '90%',
            }}
            alignItems="center"
            mx="auto"
          >
            <RadiColorLogo />
            <CompanyInfoContent data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default FaqPage;