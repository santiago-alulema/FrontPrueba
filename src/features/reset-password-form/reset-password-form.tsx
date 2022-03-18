import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { GoHomeButton } from 'components/go-home-button';
import { FormInputText } from 'features/form-input-text';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { object, ref, SchemaOf, string } from 'yup';

interface IResetFormInput {
  password: string;
}

const validationSchema: SchemaOf<IResetFormInput> = object({
  password: string()
    .required("Ingrese su contraseña")
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
  confirmPassword: string()
    .required('Ingrese su contraseña nuevamente')
    .oneOf([ref('password')], 'Las contraseñas no coinciden'),
}).required();

export type ResetPasswordFormProps = {
  guid: string;
  email: string;
}

export const ResetPasswordForm = ({ guid, email }: ResetPasswordFormProps) => {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<IResetFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IResetFormInput) => {
    setSending(true);
    usersRepository.restorePassword({
      data: {
        password: data.password,
        email,
        guid,
      }
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
      .finally(() => setSending(false));
  }

  return (
    submitted ?
      <Stack
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Box
          sx={{
            "svg": {
              height: 75,
              width: 75,
            }
          }}
        >
          <CheckCircleOutline color="success" />
        </Box>
        <Typography
          variant="h4"
          color="primary"
          textAlign="center"
        >
          <FormattedMessage
            id="resetPassword.success.title"
            defaultMessage="Contraseña actualizada"
          />
        </Typography>
        <Typography
          variant="body1"
        >
          <FormattedMessage
            id="resetPassword.success.description"
            defaultMessage="Su contraseña ha sido actualizada correctamente."
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
          Crear nueva contraseña
        </Typography>
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
        <LoadingButton
          type="submit"
          color="secondary"
          sx={{
            borderRadius: 0,
          }}
          variant="contained"
          loading={sending}
        >
          Enviar
        </LoadingButton>
      </Stack>
  )
}
