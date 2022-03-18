import { CircularProgress } from '@mui/material';
import { PayButton } from 'components/pay-button';
import { useCart } from 'context/cart';
import Decimal from 'decimal.js';
import { initDecimal } from 'hooks';
import Script from 'next/script';
import { useSnackbar } from 'notistack';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { cuaierWindow } from 'types/cuaierPay';
import { XpropsErrorResponseDto, XpropsSuccessResponseDto } from 'types/cuaierPay/button';

export type CuaierPayButtonProps = {
  onPaySuccess: (paymentInfo: XpropsSuccessResponseDto) => void;
  terms: boolean
}

const InnerPayButton = ({ onPaySuccess, terms }: CuaierPayButtonProps) => {
  const { items, customer } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const [amountWithTax, amountWithoutTax, totalTaxValue] = items.reduce(
    ([withTax, withoutTax, taxValue]: Decimal[], { totalPrice, totalTax, taxPercent }) => {
      if (taxPercent > 0) {
        return [withTax.plus(totalPrice).minus(totalTax), withoutTax, taxValue.plus(totalTax)];
      } else {
        return [withTax, withoutTax.plus(totalPrice), taxValue.plus(totalTax)];
      }
    },
    [initDecimal(0), initDecimal(0), initDecimal(0)]
  );

  const handlePayClick = () => {
    const { cuaierPay } = window as unknown as cuaierWindow;
    if (cuaierPay) {
      cuaierPay.cuaierPayPopup({
        env: 'production',
        clientTransactionId: '000',
        merchantId: 'd23d3d4a-1c4e-4f3f-b17e-e2fb6dff6358',
        amountWithTax: amountWithTax.toNumber(),
        amountWithoutTax: amountWithoutTax.toNumber(),
        taxAmount: totalTaxValue.toNumber(),
        reference: "",
        aditionalData: items.map(item => (
          {
            producto: item.name,
            cantidad: item.quantity,
            precioTotal: item.totalPrice
          }
        )),
        clientID: "",
        clientInfo: {
          identificacion: customer!.identification,
          nombreEmpresa: customer!.companyName ?? '',
          nombre: customer!.firstName,
          apellido: customer!.lastName,
          email: customer!.email,
          direccion: customer!.address,
          telefono: customer!.phone,
          codigoPostal: customer!.zipCode,
        },
        skipCheckout: true,
        onSuccess: onPaySuccess,
        onError: function (error: XpropsErrorResponseDto) {
          enqueueSnackbar(
            formatMessage({
              id: 'orderError.notification.text',
              defaultMessage: 'Error',
            }, {
              error: error.errorMsg,
            }),
            {
              variant: 'error',
            }
          );
        }
      }).render();
    }
  }

  return (
    <PayButton
      onClick={handlePayClick}
      terms={terms}

    >
      <FormattedMessage
        id="payNow.button.text"
        defaultMessage="Pagar ahora"
      />
    </PayButton>
  );
}

export const CuaierPayButton = ({ onPaySuccess, terms }: CuaierPayButtonProps) => {
  const [cuaierScriptLoaded, setCuaierScriptLoaded] = useState(false);

  const handleCuaierScriptLoaded = () => {
    setCuaierScriptLoaded(true);
  }

  useEffect(
    () => {
      const { cuaierPay } = window as unknown as cuaierWindow;
      if (cuaierPay) {
        setCuaierScriptLoaded(true);
      }
    },
    []
  );

  return (
    <Fragment>
      <Script
        src="https://secure.cuaierpay.com/sdk/payments-cuaierPay.popup.min.js?locale=es_ec"
        onLoad={handleCuaierScriptLoaded}
      />
      {
        cuaierScriptLoaded ?
          <InnerPayButton onPaySuccess={onPaySuccess} terms={terms} />
          :
          <CircularProgress sx={{ m: 'auto' }} />
      }
    </Fragment>
  );
}