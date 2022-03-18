import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { useAuth } from "context/auth/use-auth";
import { FormInputText } from "features/form-input-text";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ordersRepository } from "repository";
import { ApiErrorDto } from "types/dtos";
import { object, SchemaOf, string } from "yup";

interface ICancelFormInput {
  reason: string;
}

const validationSchema: SchemaOf<ICancelFormInput> = object({
  reason: string()
    .required("Ingrese sus motivo de cancelación"),
}).required();

type CancelModalContentProps = {
  id: number;
  number: string;
  closeHandler: () => void;
}

export const CancelModalContent = ({ id, number, closeHandler }: CancelModalContentProps) => {
  const { token } = useAuth();
  const [canceling, setCanceling] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { control, handleSubmit } = useForm<ICancelFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: ICancelFormInput) => {
    setCanceling(true);
    ordersRepository.cancel({
      id,
      data: {
        description: data.reason
      },
      key: token,
    })
      .then(() => {
        enqueueSnackbar(
          formatMessage({
            id: 'order.cancelled.notification',
            defaultMessage: 'Orden cancelada',
          }),
          {
            variant: 'success',
          }
        );
        closeHandler();
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
      .finally(() => setCanceling(false));
  };

  return (
    <Stack
      alignItems="center"
      spacing={2}
    >
      <Typography
        id="modal-cancel-order-title"
        variant="h5"
        color="secondary"
      >
        {
          `Cancelar Orden #${number}`
        }
      </Typography>
      <Stack
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
      >
        <FormInputText
          control={control}
          defaultValue=""
          name="reason"
          label="Motivo"
          placeholder="Escriba su motivo de cancelación"
          autoComplete="off"
          fullWidth
          multiline
          rows={3}
        />
        <Typography variant="caption">
          <FormattedMessage
            id="order.cancel.legend"
            defaultMessage="Su orden será cancelada"
          />
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="text"
            onClick={closeHandler}
            disabled={canceling}
          >
            Cerrar
          </Button>
          <LoadingButton
            type="submit"
            color="secondary"
            sx={{
              borderRadius: 0,
            }}
            variant="contained"
            loading={canceling}
          >
            Cancelar
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
}