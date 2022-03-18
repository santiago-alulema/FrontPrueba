import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { FormControl, Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { GoHomeButton } from 'components/go-home-button';
import { FormInputText } from 'features/form-input-text';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { object, SchemaOf, string } from 'yup';

interface IRestoreFormInput {
  email: string;
}

const validationSchema: SchemaOf<IRestoreFormInput> = object({
  email: string()
    .email("Ingrse un email válido")
    .required("Ingrese su email"),
}).required();

export type RestorePasswordFormProps = {
}

export const RestorePasswordForm = ({ }: RestorePasswordFormProps) => {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<IRestoreFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IRestoreFormInput) => {
    setSending(true);
    usersRepository.recoverPassword({
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
      .finally(() => setSending(false));
  }

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
        >
          <FormattedMessage
            id="restorePassword.checkMail.title"
            defaultMessage="Revise su correo electrónico"
          />
        </Typography>
        <Typography
          variant="body1"
        >
          <FormattedMessage
            id="restorePassword.checkMail.description"
            defaultMessage="Le enviamos un correo electrónico con las instrucciones para reestablecer su contraseña."
          />
        </Typography>
        <Typography
          variant="body2"
        >
          <FormattedMessage
            id="restorePassword.checkMail.spamAdvice"
            defaultMessage="Si no ha recibido el correo electrónico en unos minutos, por favor revise tu carpeta de spam."
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
          Recuperar contraseña
        </Typography>
        <FormControl>
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
          <FormHelperText>
            Se enviará un correo de verificacion a su
            mail, ingrese para que pueda crear una nueva
            contraseña
          </FormHelperText>
        </FormControl>
        <LoadingButton
          type="submit"
          color="secondary"
          sx={{
            borderRadius: 0
          }}
          variant="contained"
          loading={sending}
        >
          Enviar
        </LoadingButton>
      </Stack>
  )
}
