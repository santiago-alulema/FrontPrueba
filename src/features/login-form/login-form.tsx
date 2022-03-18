import { yupResolver } from '@hookform/resolvers/yup';
import { Login } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { useAuth } from 'context/auth/use-auth';
import { FormInputCheckbox } from 'features/form-input-checkbox';
import { FormInputText } from 'features/form-input-text';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { boolean, object, SchemaOf, string } from 'yup';

interface ILoginFormInput {
  email: string;
  password: string;
  keepLogged: boolean;
}

const validationSchema: SchemaOf<ILoginFormInput> = object({
  email: string()
    .email("Ingrse un email válido")
    .required("Ingrese su email"),
  password: string()
    .required("Ingrese su contraseña"),
  keepLogged: boolean()
    .required(),
}).required();

export type LoginFormProps = {
  onLoginSuccess?: () => void;
  onRestorePasswordClick?: () => void;
  onSignUpClick?: () => void;
}

export const LoginForm = ({ onRestorePasswordClick, onSignUpClick }: LoginFormProps) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { setAuthState } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<ILoginFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: ILoginFormInput) => {
    setLoggingIn(true);
    usersRepository.auth({
      data: {
        user: data.email,
        password: data.password,
        keepLogged: data.keepLogged,
      }
    })
      .then(authState => {
        setAuthState(authState);
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
      .finally(() => setLoggingIn(false));
  }

  return (
    <Stack
      alignItems="center"
      direction="column"
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        variant="h4"
        color='primary'
      >
        Iniciar sesión
      </Typography>
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
      <FormControl
        fullWidth
        sx={{
          alignItems: 'flex-end',
        }}
      >
        <FormInputText
          control={control}
          defaultValue=""
          name="password"
          label="Contraseña"
          placeholder="Escriba su contraseña"
          type="password"
          autoComplete="current-password"
          fullWidth
        />
        <FormHelperText>
          <Button
            type="button"
            color="primary"
            sx={{
              alignSelf: 'flex-start',
              borderRadius: 0,
              textTransform: 'inherit',
              fontSize: 'inherit',
            }}
            variant="text"
            onClick={onRestorePasswordClick}
          >
            Olvidé mi contraseña
          </Button>
        </FormHelperText>
      </FormControl>
      <FormControl
        sx={{ alignSelf: 'flex-start' }}
      >
        <FormInputCheckbox
          control={control}
          defaultValue={true}
          labelProps={{
            sx: {
              color: 'primary.main',
            },
            label: "Mantenerme conectado"
          }}
          name="keepLogged"
        />
        <FormHelperText>
          Si el ordenador es público desmarcar esta casilla
        </FormHelperText>
      </FormControl>
      <LoadingButton
        type="submit"
        color="secondary"
        sx={{
          borderRadius: 0,
        }}
        variant="contained"
        loading={loggingIn}
        loadingPosition="start"
        startIcon={<Login />}
      >
        {
          loggingIn ?
            'Ingresando'
            :
            'Ingresar'
        }
      </LoadingButton>
      <Typography
        variant="h6"
        gutterBottom
        color="primary"
      >
        ¿No tienes una cuenta?
      </Typography>
      <Button
        color="secondary"
        sx={{
          borderRadius: 0
        }}
        variant="contained"
        onClick={onSignUpClick}
      >
        Crear cuenta
      </Button>
    </Stack>
  )
}
