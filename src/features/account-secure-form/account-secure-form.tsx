
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useAuth } from 'context/auth/use-auth';
import { FormInputText } from 'features/form-input-text';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { object, ref, SchemaOf, string } from 'yup';

interface IAccountSecureFormInput {
  currentPassword: string;
  password: string;
}

const validationSchema: SchemaOf<IAccountSecureFormInput> = object({
  currentPassword: string()
    .required("Ingrese su contraseña actual"),
  password: string()
    .required("Ingrese su contraseña")
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
  confirmPassword: string()
    .required('Ingrese su contraseña nuevamente')
    .oneOf([ref('password')], 'Las contraseñas no coinciden'),
}).required();

export type AccountSecureFormProps = {
}

export const AccountSecureForm = ({ }: AccountSecureFormProps) => {
  const { token, } = useAuth();
  const [updating, setUpdating] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<IAccountSecureFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async ({ currentPassword, password }: IAccountSecureFormInput) => {
    setUpdating(true);
    try {
      const userData = await usersRepository.whoIam({
        key: token
      });

      await usersRepository.auth({
        data: {
          user: userData.email,
          password: currentPassword,
          keepLogged: false
        }
      });

      await usersRepository.updatePassword({
        data: { password },
        key: token,
      });

      enqueueSnackbar(
        formatMessage({
          id: 'updateAccount.success.title',
          defaultMessage: 'Actualizado correctamente',
        }),
        {
          variant: 'success',
        }
      );
    } catch (e: any) {
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
    }
    setUpdating(false);
  };

  return (
    <Stack
      alignItems="center"
      direction="column"
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        variant="h5"
        color="primary"
      >
        Información de seguridad
      </Typography>
      <FormInputText
        control={control}
        defaultValue=""
        name="currentPassword"
        label="Contraseña actual"
        placeholder="Escriba su contraseña actual"
        type="password"
        fullWidth
      />
      <FormInputText
        control={control}
        defaultValue=""
        name="password"
        label="Contraseña nueva"
        placeholder="Escriba su contraseña nueva"
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
        loading={updating}
      >
        Actualizar
      </LoadingButton>
    </Stack>
  )
}
