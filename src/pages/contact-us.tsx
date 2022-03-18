import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, TypographyProps } from "@mui/system";
import { contactUs } from "assets/img/images";
import { SEO } from "components";
import Image from "components/image/image";
import Link from "components/Link";
import { WhatsappLink } from "components/whatsapp-link";
import { FormInputText } from "features/form-input-text";
import { useCompanyContactInfo } from "hooks";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { contactRepository } from "repository";
import { ApiErrorDto } from "types/dtos";
import { object, SchemaOf, string } from 'yup';

interface IContactFormInput {
  firstName: string;
  lastName: string;
  email: string;
  issue: string;
  message: string;
}
const validationSchema: SchemaOf<IContactFormInput> = object({
  firstName: string()
    .required("Ingrese su nombre"),
  lastName: string()
    .required("Ingrese su apellido"),
  email: string()
    .email("Ingrse un email válido")
    .required("Ingrese su email"),
  issue: string()
    .required("Ingrese el asunto"),
  message: string()
    .required("Ingrese su problema"),
}).required();

const PrimaryTypo = styled((props: TypographyProps) => (
  <Typography
    variant="h6"
    {...props}>

  </Typography>
))(() => ({
  color: 'primary.main',
  marginTop: "3vh",
  fontWeight: "bold",
}));
const Title = (
  <Typography
    textAlign="center"
    mb={{ md: 2, xs: 3 }}
    variant="h4"
    color={'primary.main'}>
    Contáctanos
  </Typography>
);

const BannerTop = (
  <Grid alignItems="center" justifyContent="space-around" direction="row" container sx={{ display: { md: "none" }, backgroundColor: 'primary.main', mb: 4 }}>
    <Grid item xs={2}>
      <Image
        src={contactUs}
        alt={"Comunicate con nosotros"}
        layout="responsive"
      />
    </Grid>
    <Grid item xs={4}>
      <Typography
        variant="h4"
        fontSize={{ sm: 33, xs: 16 }} style={{
          transform: "rotate(-10deg)"
        }}
        color="common.white">Comunicate con nosotros</Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography variant="body1"
        fontSize={{ sm: 20, xs: 9 }} style={{
          transform: "rotate(-10deg)"
        }}
        color="common.white">TE AYUDAMOS CON TODAS
        LAS INQUIETUDES QUE TENGAS</Typography>
    </Grid>
  </Grid>
)

export default function ContactUsPage() {
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<IContactFormInput>({ resolver: yupResolver(validationSchema) });
  const { data, loading } = useCompanyContactInfo({});

  const onSubmit = (data: IContactFormInput) => {
    setSubmitting(true);
    contactRepository.sendContact({
      data,
    })
      .then(() => {
        enqueueSnackbar(
          formatMessage({
            id: 'contactReceived.notification.text',
            defaultMessage: 'Gracias por contactarnos, te responderemos lo antes posible.',
          }),
          {
            variant: 'success',
          }
        );
      })
      .catch((e: ApiErrorDto) => {
        enqueueSnackbar(
          formatMessage({
            id: 'generalNotification.error.text',
            defaultMessage: 'Error {error}',
          }, {
            error: e.message,
          }),
          {
            variant: 'error',
          }
        );
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <Grid
      px={{ md: "5%" }}
      mt={{
        md: 4,
      }}>
      <SEO title="Comunicate con nosotros" description="Te ayudamos con todas las inquietudes que tengas." />
      {BannerTop}
      {Title}
      <Grid container
        spacing={{
          xs: 3,
          md: 4
        }}
        justifyContent="center">
        <Grid
          item
          md
        >
          <Stack sx={{ display: { xs: "none", md: "block" } }}>
            <Typography
              style={{
                transform: "rotate(-10deg)"
              }}
              fontWeight="bold"
              variant="h3"
              color='secondary.main'
              mb={1}
            >
              Comunicate con nosotros{" "}
            </Typography>
            <Typography
              fontWeight="bold"
              variant="h6"
              color={'primary.main'}
              ml={2}
              style={{
                transform: "rotate(-10deg)"
              }}
            >
              TE AYUDAMOS CON TODAS LAS INQUIETUDES QUE TENGAS
            </Typography>
            <Image
              src={contactUs}
              alt={"Comunicate con nosotros"}
              layout="intrinsic"
            />
          </Stack>
        </Grid>
        <Grid item md>
          <Typography fontWeight="bold" variant="h5" color="primary">
            Información de contacto
          </Typography>
          <Stack ml={{ xs: "14%", md: "10%" }}>
            <PrimaryTypo>Teléfono</PrimaryTypo>
            <Typography variant="h6" fontWeight="bold">
              {
                loading ?
                  <Skeleton />
                  :
                  data ?
                    <Link
                      href={`tel:${data.phone}`}
                      underline="none"
                    >
                      {
                        data.phone
                      }
                    </Link>
                    : null
              }
            </Typography>

            <PrimaryTypo>Whatsapp</PrimaryTypo>
            {
              loading ?
                <Skeleton />
                :
                data?.whatsappNumber ?
                  <WhatsappLink
                    number={data.whatsappNumber}
                    message={data.whatsappMessage}
                    color="primary"
                  />
                  :
                  null
            }

            <PrimaryTypo>Correo electrónico</PrimaryTypo>
            <Typography variant="h6" fontWeight="bold">
              {
                loading ?
                  <Skeleton />
                  :
                  data ?
                    <Link
                      href={`mailto:${data.email}`}
                      underline="none"
                    >
                      {
                        data.email
                      }
                    </Link>
                    : null
              }
            </Typography>
          </Stack>
        </Grid>
        <Grid item md mb={2}>
          <Stack
            spacing={2}
            mb={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            alignItems="center"
          >
            <Typography variant="h5" color="primary" fontWeight="bold">
              Mensajes o sugerencias
            </Typography>
            <FormInputText
              control={control}
              name="firstName"
              label="Nombre"
              placeholder="Escriba su nombre"
              autoComplete="given-name"
              fullWidth
            />
            <FormInputText
              control={control}
              name="lastName"
              label="Apellido"
              placeholder="Escriba su apellido"
              autoComplete="family-name"
              fullWidth
            />
            <FormInputText
              control={control}
              name="email"
              label="Correo electrónico"
              placeholder="Escriba su correo electrónico"
              type="email"
              autoComplete="email"
              fullWidth
            />
            <FormInputText
              control={control}
              name="issue"
              label="Asunto"
              placeholder="Asunto"
              autoComplete="issue"
              fullWidth
            />
            <FormInputText
              control={control}
              name="message"
              label="Mensaje"
              placeholder="Mensaje"
              autoComplete="message"
              fullWidth
              multiline
              rows={8}
            />
            <LoadingButton
              type="submit"
              color="secondary"
              sx={{
                borderRadius: 0,
              }}
              variant="contained"
              loading={submitting}
            >
              Enviar
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
