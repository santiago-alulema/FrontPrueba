
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { GoHomeButton } from 'components/go-home-button';
import { FormInputCheckbox } from 'features/form-input-checkbox';
import { FormInputText } from 'features/form-input-text';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { boolean, object, ref, SchemaOf, string } from 'yup';

interface IRegisterFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscribed: boolean;
}

const validationSchema: SchemaOf<IRegisterFormInput> = object({
  firstName: string()
    .required("Ingrese su nombre"),
  lastName: string()
    .required("Ingrese su apellido"),
  email: string()
    .email("Ingrse un email válido")
    .required("Ingrese su email"),
  password: string()
    .required("Ingrese su contraseña")
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
  confirmPassword: string()
    .required('Ingrese su contraseña nuevamente')
    .oneOf([ref('password')], 'Las contraseñas no coinciden'),
  subscribed: boolean()
    .required(),
}).required();

export type RegisterFormProps = {
  onRegistered?: () => void;
}

export const RegisterForm = ({ }: RegisterFormProps) => {
  const [creating, setCreating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<IRegisterFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IRegisterFormInput) => {
    setCreating(true);
    usersRepository.register({
      data,
    })
      .then(() => {
        setSubmitted(true);
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
      .finally(() => setCreating(false));
  };

  return (
    submitted ?
      <Stack
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Typography
          variant="h4"
          color="primary"
          textAlign="center"
        >
          <FormattedMessage
            id="createAccount.checkMail.title"
            defaultMessage="Gracias por formar parte de nosotros"
          />
        </Typography>
        <Typography
          variant="body1"
        >
          <FormattedMessage
            id="createAccount.checkMail.description"
            defaultMessage="Por favor verifique su correo electrónico para validar su cuenta."
          />
        </Typography>
        <GoHomeButton />
      </Stack>
      :
      <Stack
        alignItems="center"
        direction="column"
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h4"
          color="primary"
        >
          Crea tu cuenta
        </Typography>
        <FormInputText
          control={control}
          defaultValue=""
          name="firstName"
          label="Nombre"
          placeholder="Escriba su nombre"
          autoComplete="given-name"
          fullWidth
        />
        <FormInputText
          control={control}
          defaultValue=""
          name="lastName"
          label="Apellido"
          placeholder="Escriba su apellido"
          autoComplete="family-name"
          fullWidth
        />
        <FormInputText
          control={control}
          defaultValue=""
          name="email"
          label="Correo electrónico"
          placeholder="Escriba su correo electrónico"
          type="email"
          autoComplete="email"
          fullWidth
        />
        <FormInputText
          control={control}
          defaultValue=""
          name="password"
          label="Contraseña"
          placeholder="Escriba su contraseña"
          type="password"
          autoComplete="new-password"
          fullWidth
        />
        <FormInputText
          control={control}
          defaultValue=""
          name="confirmPassword"
          label="Confirmar contraseña"
          placeholder="Escriba su contraseña nuevamente"
          type="password"
          autoComplete="new-password"
          fullWidth
        />
        <FormInputCheckbox
          control={control}
          defaultValue={true}
          labelProps={{
            sx: {
              color: 'primary.main',
            },
            label: "Recibir correos sobre promociones o descuentos en nuestros productos",
          }}
          name="subscribed"
        />
        <LoadingButton
          type="submit"
          color="secondary"
          sx={{
            borderRadius: 0,
          }}
          variant="contained"
          loading={creating}
        >
          Crear cuenta
        </LoadingButton>
        <FormHelperText>
          Al hacer clic en Crear cuenta, aceptas que has leído los
          terminos y condiciones
        </FormHelperText>
      </Stack>
  )
}
