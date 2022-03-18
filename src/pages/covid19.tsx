import { Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, TypographyProps } from "@mui/system";
import { covid19 } from "assets/img/images";
import { SEO } from "components";
import Image from "components/image/image";
import React from "react";
import { messagesClientes, messagesLocal } from "../site/medidas-covid";

const StyledTypo = styled((props: TypographyProps) => (
  <Typography variant="body1" {...props}></Typography>
))({
  width: "100%",
  fontWeight: "bolder",
});

const BannerTop = (
  <Grid alignItems="center" justifyContent="space-around" direction="row" container sx={{ display: { md: "none" }, backgroundColor: 'primary.main' }}>
    <Grid item xs={4} sm={3}>
      <Image
        src={covid19}
        alt={"Medidas contra el covid"}
        layout="responsive"
      />
    </Grid>
    <Grid item xs={4} pb={3} pt={2}>
      <Typography
        variant="h4"
        fontSize={{ sm: 28, xs: 15 }}
        style={{
          transform: "rotate(-10deg)"
        }}
        color="common.white">Nos cuidamos y te cuidamos</Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography variant="body1"
        fontSize={{ sm: 17, xs: 9 }}
        style={{
          transform: "rotate(-10deg)"
        }}
        color="common.white">CONTAMOS CON TODAS LAS NORMAS DE BIOSEGURIDAD</Typography>
    </Grid>
  </Grid>
)

export default function Covid19Page() {
  return (
    <Box>
      <SEO title="Covid 19" description="Medidas que tomamos para reducir el riesgo de contagio." />
      {BannerTop}
      <Grid container mt={1} spacing={8} px="1%">
        <Grid item md={8} xs={12} mx={{ xs: 2, md: 0 }}>
          <Grid container spacing={{ xs: 3, sm: 5, md: 3 }}>
            <Typography
              color='primary.main'
              variant="h4"
              fontWeight="bold"
              fontSize={25}
              width="100%"
              pl={{ md: 3, sm: 5, xs: 3 }}
            >
              Medidas que deben cumplir nuestros clientes
            </Typography>
            {messagesClientes.map((resp, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <StyledTypo>{resp.message}</StyledTypo>
              </Grid>
            ))
            }
            <Typography
              color='primary.main'
              variant="h5"
              fontWeight="bold"
              width="100%"
              mt={5}
              pl={{ md: 3, sm: 5, xs: 3 }}
            >
              Medidas en nuestro local
            </Typography>

            {messagesLocal.map((resp, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <StyledTypo>{resp.message}</StyledTypo>
              </Grid>
            ))
            }
          </Grid>
        </Grid>
        <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Typography
            style={{ transform: "rotate(-13deg)" }}
            variant="h2"
            color="secondary"
            ml={-4}
            fontSize={50}
            gutterBottom
          >
            Nos cuidamos y te cuidamos
          </Typography>
          <Typography
            fontWeight="bold"
            variant="h5"
            color="primary"
            ml={-2}
            mt={-1}
            mb={7}
            style={{ transform: "rotate(-13deg)" }}
          >
            CONTAMOS CON TODAS LAS NORMAS DE BIOSEGURIDAD
          </Typography>
          <Image
            src={covid19}
            alt={"Medidas contra el covid"}
            layout="responsive"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
