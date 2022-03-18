import { Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { datosRetiro } from "assets/img/images";
import Image from "components/image/image";
import { MobileBanner } from "components/mobile-banner";
import { RadiColorLogo } from "components/radi-color-logo";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ShippingPickUpForm } from "./shipping-pickup-form";

export default function ShippingPickup() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
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
              img={datosRetiro}
              alt="Retirar pedido"
              intlId="shipping.pickup.Thanks.text"
              intlDefault="Gracias por tu compra"
              altIntlId="shipping.enjoyWithYourFamily.text"
              altIntlDefault="DISFRÚTALA CON TODA TU FAMILIA"
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
                  id="shipping.pickup.Thanks.text"
                  defaultMessage="Gracias por tu compra"
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
                  id="shipping.enjoyWithYourFamily.text"
                  defaultMessage="DISFRÚTALA CON TODA TU FAMILIA"
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
                src={datosRetiro}
                alt={"Datos de Retiro"}
                layout="fill"
                objectFit="contain"
                objectPosition="bottom"
              />
            </Grid>
          </Grid>
      }
      <Grid item container xs={12} md={6} alignItems="center" direction="column">
        <RadiColorLogo />
        <Typography gutterBottom variant="h4" color={'primary.main'}>
          <FormattedMessage
            id="shipping.pickup.form.title"
            defaultMessage="Datos de la persona que retira"
          />
        </Typography>
        <ShippingPickUpForm />
      </Grid>
    </Grid>
  )
}
