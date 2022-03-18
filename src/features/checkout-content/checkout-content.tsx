import { ChangeCircle } from "@mui/icons-material";
import { Button, Stack, Step, StepButton, Stepper, Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { checkout } from "assets/img/images";
import BillingInfoForm from "components/billing-info-form/billing-info-form";
import Image from "components/image/image";
import { MobileBanner } from "components/mobile-banner";
import { PaymentWayForm } from "components/payment-way-form";
import { RadiColorLogo } from "components/radi-color-logo";
import { shippingNames } from "constants/shippingNames";
import { useAuth } from "context/auth/use-auth";
import { useCart } from "context/cart";
import { LoginContent } from "features/login-content";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

const STEP_BILLING = 0;
const STEP_PAYMENT_WAY = 1;

const stepLabel = {
  [STEP_BILLING]: "checkout.insertBillingInformation.text",
  [STEP_PAYMENT_WAY]: "checkout.selectPaymentMethod.text",
}

const steps = [
  stepLabel[STEP_BILLING],
  stepLabel[STEP_PAYMENT_WAY],
]

export default function CheckoutContent() {
  const { isLogged } = useAuth();
  const { shipping, removeShipping } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const nextStep = () => {
    setActiveStep(s => s + 1)
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleChangeShipping = () => {
    removeShipping()
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
              img={checkout}
              alt="Paga de manera segura"
              intlId="checkout.banner.title"
              intlDefault="Paga de manera segura"
              altIntlId="checkout.description.text"
              altIntlDefault="Todos tus datos son completamente confidenciales"
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
                  id="checkout.banner.title"
                  defaultMessage="Paga de manera segura"
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
                  id="checkout.description.text"
                  defaultMessage="Todos tus datos son completamente confidenciales"
                />
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                position: 'relative',
                width: '100%',
              }}
              xs={8}
            >
              <Image
                src={checkout}
                alt={"Datos de Envío"}
                layout="fill"
                objectFit="contain"
                objectPosition="bottom"
              />
            </Grid>
          </Grid>
      }
      <Grid item container xs={12} md={6} alignItems="center" direction="column">
        {
          isLogged ?
            <Stack
              spacing={2}
              alignItems="center"
              mb={2}
            >
              <RadiColorLogo />
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h6" color="primary">
                  <FormattedMessage
                    id="shippingWay.title"
                    defaultMessage="Forma de envío"
                  />
                </Typography>
                <Typography variant="h6">
                  {
                    shippingNames[shipping!.type]
                  }
                </Typography>
                <Button
                  variant="text"
                  endIcon={<ChangeCircle />}
                  onClick={handleChangeShipping}
                >
                  <FormattedMessage
                    id="changeShipping.button.text"
                    defaultMessage="Cambiar"
                  />
                </Button>
              </Stack>
              <Stepper activeStep={activeStep} sx={{ width: '100%' }} alternativeLabel>
                {steps.map((labelId, index) => {
                  return (
                    <Step key={labelId} completed={activeStep > index}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        <Typography variant="h6">
                          <FormattedMessage
                            id={labelId}
                            defaultMessage={`Step ${index}`}
                          />
                        </Typography>
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              {
                activeStep === STEP_BILLING &&
                <BillingInfoForm onComplete={nextStep} />
              }
              {
                activeStep === STEP_PAYMENT_WAY &&
                <PaymentWayForm />
              }
            </Stack>
            :
            <Stack
              spacing={2}
              alignItems="center"
              mb={2}
            >
              <RadiColorLogo />
              <LoginContent />
            </Stack>
        }
      </Grid>
    </Grid>
  )
}
