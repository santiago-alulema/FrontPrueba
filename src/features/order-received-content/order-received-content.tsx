import { paymentNames } from "@constants";
import { Button, Card, CardActions, CardContent, Divider, Stack, Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { datosRetiro } from "assets/img/images";
import Image from "components/image/image";
import Link from "components/Link";
import { MobileBanner } from "components/mobile-banner";
import { PaymentTypeEnum } from "enums/PaymentTypeEnum";
import { initDecimal } from "hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { VIEW_ORDERS_PAGE } from "site/navigation";
import { PlacedOrderDto } from "types/dtos";

type OrderReceivedContentProps = {
  orderInfo: PlacedOrderDto,
}

export default function OrderReceivedContent({ orderInfo }: OrderReceivedContentProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const {
    number,
    amount: {
      value: amountValue,
      breakdown
    },
    customer: {
      email
    },
    payment,
  } = orderInfo;
  const {
    itemTotal,
    shipping,
    shippingDiscount,
    shippingTax,
    itemTax,
    itemDiscount
  } = breakdown;

  const shippingTotal = initDecimal(shipping.value).minus(shippingDiscount.value).plus(shippingTax.value);
  const isFreeShipping = shippingTotal.equals(0);

  const paymentWayDescription = {
    [PaymentTypeEnum.CARD]: (
      <Typography variant="body2">
        {paymentNames[PaymentTypeEnum.CARD]}
        <br />
        <FormattedMessage
          id="order.paymentWay.card.last4Digits"
          defaultMessage="Termina en {last4Digits}"
          values={{
            last4Digits: payment.result?.last4Digits
          }}
        />
      </Typography>
    ),
    [PaymentTypeEnum.TRANSFER]: (
      <Typography variant="body2">
        {paymentNames[PaymentTypeEnum.TRANSFER]}
      </Typography>
    ),
    [PaymentTypeEnum.CASH]: (
      <Typography variant="body2">
        {paymentNames[PaymentTypeEnum.CASH]}
      </Typography>
    ),
  }

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
      <Grid
        item
        container
        xs={12}
        md={6}
        alignItems="center"
        direction="column"
        spacing={2}
        m={{
          xs: 2,
          md: 0,
        }}
      >
        <Typography gutterBottom variant="h4" color="primary">
          <FormattedMessage
            id="orderReceived.title"
            defaultMessage="Hemos recibido tu orden"
          />
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="primary" textAlign="center">
          <FormattedMessage
            id="orderReceived.description"
            defaultMessage="Te enviaremos un correo de confirmación a {email}"
            values={{
              email: (
                <Typography
                  variant="subtitle1"
                  component="strong"
                  color="secondary"
                  fontWeight="bold"
                >
                  {email}
                </Typography>
              ),
            }}
          />
        </Typography>
        <Card
          sx={{
            width: {
              xs: '90%',
              sm: '70%',
              lg: '60%',
            }
          }}
        >
          <CardContent
            component={Stack}
            spacing={2}
          >
            <Typography variant="h5">
              <FormattedMessage
                id="orderReceived.orderNumber.text"
                defaultMessage="Orden número {number}"
                values={{
                  number: (
                    <Typography
                      variant="h5"
                      component="strong"
                      color="secondary"
                      fontWeight="bold"
                    >
                      {number}
                    </Typography>
                  ),
                }}
              />
            </Typography>
            <Stack>
              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body1" fontWeight="bold">
                  <FormattedMessage
                    id="order.subtotal.text"
                    defaultMessage="Subtotal"
                  />
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {
                    `$${itemTotal.value.toFixed(2)}`
                  }
                </Typography>
              </Stack>
              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body2">
                  <FormattedMessage
                    id="order.shipping.text"
                    defaultMessage="Envío"
                  />
                </Typography>
                <Typography variant="body2">
                  {
                    isFreeShipping ?
                      <FormattedMessage
                        id="order.shipping.free.text"
                        defaultMessage="Gratis"
                      />
                      :
                      `$${shippingTotal.toFixed(2)}`
                  }
                </Typography>
              </Stack>
              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body2">
                  <FormattedMessage
                    id="order.discount.text"
                    defaultMessage="Descuento"
                  />
                </Typography>
                <Typography variant="body2">
                  {
                    `$${itemDiscount.value.toFixed(2)}`
                  }
                </Typography>
              </Stack>
              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body2">
                  <FormattedMessage
                    id="order.taxes.text"
                    defaultMessage="Impuestos"
                  />
                </Typography>
                <Typography variant="body2">
                  {
                    `$${itemTax.value.toFixed(2)}`
                  }
                </Typography>
              </Stack>
              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body1" fontWeight="bold">
                  <FormattedMessage
                    id="order.total.text"
                    defaultMessage="Total"
                  />
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {
                    `$${amountValue.toFixed(2)}`
                  }
                </Typography>
              </Stack>
            </Stack>
            <Divider>
              <Typography variant="body1" fontWeight="bold">
                <FormattedMessage
                  id="paymentWay.title"
                  defaultMessage="Forma de pago"
                />
              </Typography>
            </Divider>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {
                paymentWayDescription[payment.type]
              }
              <Typography variant="body1" fontWeight="bold">
                {
                  payment.type === PaymentTypeEnum.CARD ?
                    `$${payment.result?.totalValue.toFixed(2)}`
                    :
                    `$${amountValue.toFixed(2)}`
                }
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="text"
              href={VIEW_ORDERS_PAGE}
              LinkComponent={Link}
            >
              <FormattedMessage
                id="orderReceived.viewDetails.text"
                defaultMessage="Ver detalles"
              />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}