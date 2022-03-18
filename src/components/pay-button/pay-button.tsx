import { LoadingButton } from "@mui/lab";
import { useCart } from "context/cart";
import { useSnackbar } from "notistack";
import React, { MouseEvent, PropsWithChildren, useState } from "react";
import { useIntl } from "react-intl";
import { stockRepository } from "repository";
import { ApiErrorDto, VerifyStockResultDto } from "types/dtos";

export type PayButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  terms: boolean
}

export const PayButton = ({ children, onClick, terms }: PropsWithChildren<PayButtonProps>) => {
  const { items } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const handlePayButtonMiddleware = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    stockRepository.verifyStock({
      data: items.map(({ id, quantity }) => ({
        id,
        quantity: quantity,
      }))
    })
      .then((result: VerifyStockResultDto[]) => {
        if (result.length === 0) {
          onClick(e);
        } else {
          enqueueSnackbar(`No hay suficiente existencia para el(los) item(s): \n ${result.map(
            r => `${items.find(i => i.id === r.id)?.name} - máximo ${r.max}`
          ).join("\n")
            }`,
            {
              variant: 'error',
              style: { whiteSpace: 'pre-line' },
            }
          );
        }
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
      .finally(() => setLoading(false));
  }

  return (
    <LoadingButton
      type="submit"
      color="secondary"
      sx={{
        borderRadius: 0,
      }}
      variant="contained"
      loading={loading}
      onClick={handlePayButtonMiddleware}
      disabled={terms ? false : true}
    >
      {children}
    </LoadingButton>
  )
}