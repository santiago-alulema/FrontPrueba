import { Stack, Theme, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { recibirPedido1, recibirPedido2 } from "assets/img/images";
import Image from "components/image/image";
import { MobileBanner } from "components/mobile-banner";
import { RadiColorLogo } from "components/radi-color-logo";
import { shippingNames, shippingNamesIds } from "constants/shippingNames";
import { ShippingEnum } from "enums";
import ShippingNormal from "features/shipping-normal/shipping-normal";
import ShippingPickup from "features/shipping-pickup/shipping-pickup";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

export default function ShippingWays() {
  const [shippingType, setShippingType] = useState<ShippingEnum>();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handlePickupShippingClick = () => {
    setShippingType(ShippingEnum.PICKUP_IN_PERSON);
  }

  const handleShippingClick = () => {
    setShippingType(ShippingEnum.SHIPPING_NORMAL);
  }

  return (
    shippingType ?
      shippingType === ShippingEnum.PICKUP_IN_PERSON ?
        <ShippingPickup />
        :
        <ShippingNormal />
      :
      <Stack
        alignItems="center"
        spacing={1}
        pt={{
          xs: 1,
          md: 3,
        }}
        height="100%"
      >
        <RadiColorLogo />
        <Typography variant="h4" color="primary">
          ¿Cómo desea recibir su pedido?
        </Typography>
        <Grid
          container
          spacing={2}
          height="100%"
        >
          {
            isMobile ?
              <Grid item xs={12} px="0 !important">
                <MobileBanner
                  img={recibirPedido2}
                  alt="Recibir pedido 2"
                  intlId={shippingNamesIds[ShippingEnum.PICKUP_IN_PERSON]}
                  intlDefault="Retira de nuestro local"
                />
              </Grid>
              :
              <Grid
                item
                container
                md={3}
                direction="column"
                sx={{
                  height: '100%',
                }}
              >
                <Grid
                  item
                >
                  <Typography
                    style={{ transform: "rotate(-10deg)" }}
                    variant="h3"
                    color="secondary"
                  >
                    {
                      shippingNames[ShippingEnum.PICKUP_IN_PERSON]
                    }
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    position: 'relative',
                    width: '100%',
                  }}
                  xs
                >
                  <Image
                    src={recibirPedido2}
                    alt="Recibir pedido 2"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="bottom"
                  />
                </Grid>
              </Grid>
          }
          <Grid item container xs={12} md={3} direction="column" alignItems="center">
            <Typography
              textAlign="left"
              variant="h6"
              fontFamily="panton"
              sx={{
                maxWidth: {
                  xs: '60%',
                  md: 'none'
                }
              }}
            >
              <FormattedMessage
                id="shipping.pickup.description.text"
                defaultMessage="Retira de nuestro local"
              />
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                borderRadius: 0,
                mt: 2,
              }}
              onClick={handlePickupShippingClick}
            >
              <FormattedMessage
                id="askFor.button.text"
                defaultMessage="Solicitar"
              />
            </Button>
          </Grid>
          {
            isMobile ?
              <Grid item xs={12} px="0 !important">
                <MobileBanner
                  img={recibirPedido1}
                  alt="Recibir pedido"
                  intlId={shippingNamesIds[ShippingEnum.SHIPPING_NORMAL]}
                  intlDefault="Recibir a domicilio"
                />
              </Grid>
              :
              <Grid
                item
                container
                md={3}
                direction="column"
                sx={{
                  height: '100%',
                }}
              >
                <Grid
                  item
                >
                  <Typography
                    style={{ transform: "rotate(-10deg)" }}
                    variant="h3"
                    color="secondary"
                  >
                    {
                      shippingNames[ShippingEnum.SHIPPING_NORMAL]
                    }
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    position: 'relative',
                    width: '100%',
                  }}
                  xs
                >
                  <Image
                    src={recibirPedido1}
                    alt="Recibir pedido 1"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="bottom"
                  />
                </Grid>
              </Grid>
          }
          <Grid item container xs={12} md={3} direction="column" alignItems="center">
            <Typography
              textAlign="left"
              variant="h6"
              fontFamily="panton"
              sx={{
                maxWidth: {
                  xs: '60%',
                  md: 'none'
                }
              }}
            >
              <FormattedMessage
                id="shipping.normal.description.text"
                defaultMessage="Recibir a domicilio"
              />
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                borderRadius: 0,
                mt: 2,
              }}
              onClick={handleShippingClick}
            >
              <FormattedMessage
                id="askFor.button.text"
                defaultMessage="Solicitar"
              />
            </Button>
          </Grid>
        </Grid>
      </Stack>
  )
}
