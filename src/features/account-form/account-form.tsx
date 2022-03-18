
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
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { GetUserDto } from 'types/dtos/GetUserDto';
import { object, SchemaOf, string } from 'yup';

interface IAccountFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

const validationSchema: SchemaOf<IAccountFormInput> = object({
  firstName: string()
    .required("Ingrese su nombre"),
  lastName: string()
    .required("Ingrese su apellido"),
  email: string()
    .email("Ingrse un email válido")
    .required("Ingrese su email"),
}).required();

export type AccountFormProps = {
  userInfo: GetUserDto,
}

export const AccountForm = ({ userInfo }: AccountFormProps) => {
  const { token } = useAuth();
  const [updating, setUpdating] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<IAccountFormInput>({ resolver: yupResolver(validationSchema), defaultValues: userInfo });

  const onSubmit = (data: IAccountFormInput) => {
    setUpdating(true);
    usersRepository.updateUser({
      data,
      key: token,
    })
      .then(() => {
        enqueueSnackbar(
          formatMessage({
            id: 'updateAccount.success.title',
            defaultMessage: 'Actualizado correctamente',
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
      .finally(() => setUpdating(false));
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
        Información básica
      </Typography>
      <Stack
        direction={{
          xs: "column",
          sm: "row"
        }}
        spacing={2}
        width="100%"
      >
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
      </Stack>
      <FormInputText
        control={control}
        name="email"
        label="Correo electrónico"
        placeholder="Escriba su correo electrónico"
        type="email"
        autoComplete="email"
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
