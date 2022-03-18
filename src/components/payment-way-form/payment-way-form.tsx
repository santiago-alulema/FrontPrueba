import { Backdrop, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { BankTransferInfo } from 'components/bank-transfer-info';
import { CuaierPayButton } from 'components/cuaierpay-button';
import { StyledFormLabel, StyledRadio } from 'components/layout';
import { PayButton } from 'components/pay-button';
import { useAuth } from 'context/auth/use-auth';
import { useCart } from 'context/cart';
import { PaymentTypeEnum } from 'enums/PaymentTypeEnum';
import { initDecimal } from 'hooks';
import { useCompanyTermsConditions } from 'hooks/use-company-information';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { MouseEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ordersRepository } from 'repository/ordersRepository';
import { ORDER_RECEIVED_PAGE } from 'site/navigation';
import { XpropsSuccessResponseDto } from 'types/cuaierPay/button';
import { CompanyInfoDto } from 'types/dtos';
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { OrderDto, OrderItem } from 'types/dtos/order';
import { LabelTermsConditions } from './modal-way-form';


export const PaymentWayForm = () => {
  const { push } = useRouter();
  const { token } = useAuth();
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>(PaymentTypeEnum.CARD);
  const [savingOrder, setSavingOrder] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { customer, items, shipping, getCartSubtotal, getCartTotalDiscountValue, getCartTotalTaxValue, getCartTotal, clearCart, removeShipping } = useCart();

  const [terms, setTerms] = useState(true);

  const CheckTerms = () => {

    const INITIAL_DATA: CompanyInfoDto = {
      info: ''
    }

    const { data } = useCompanyTermsConditions({ initialData: INITIAL_DATA });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTerms(event.target.checked);
    };

    return (
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={terms} onChange={handleChange}
          sx={{
            color: "primary",
            '&.Mui-checked': {
              color: "secondary",
            },
          }}
        />} label={<LabelTermsConditions data={data?.info} />} />
      </FormGroup>
    )
  }

  const placeOrder = async (paymentInfo?: XpropsSuccessResponseDto) => {

    setSavingOrder(true);
    const cartTotal = +getCartTotal().toFixed(2);
    const order: OrderDto = {
      customer,
      amount: {
        value: cartTotal,
        breakdown: {
          itemTotal: {
            value: getCartSubtotal().toNumber(),
          },
          shipping: {
            value: 0,
          },
          shippingDiscount: {
            value: 0,
          },
          shippingTax: {
            value: 0,
          },
          itemTax: {
            value: getCartTotalTaxValue().toNumber(),
          },
          itemDiscount: {
            value: getCartTotalDiscountValue().toNumber(),
          },
        }
      },
      items: items.map<OrderItem>(i => {
        const discountPerItem = initDecimal(i.totalDiscount).div(i.quantity);
        const taxPerItem = initDecimal(i.totalTax).div(i.quantity);
        const item: OrderItem = {
          id: i.id,
          name: i.name,
          unitAmount: i.price,
          discount: {
            percent: + (discountPerItem.div(i.price)).times(100).toFixed(2),
            value: discountPerItem.toNumber(),
          },
          tax: {
            percent: i.taxPercent,
            value: taxPerItem.toNumber(),
          },
          quantity: i.quantity,
        }
        return item;
      }),
      shipping: shipping!,
      payment: {
        type: paymentType,
        result: paymentInfo
      },
    }
    ordersRepository.placeOrder({
      key: token,
      data: order
    })
      .then((orderPlaced) => {
        clearCart();
        removeShipping();
        push(ORDER_RECEIVED_PAGE + "/" + orderPlaced.id)
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
        setSavingOrder(false);
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(+event.target.value as PaymentTypeEnum);
  };

  const handlePayButton = (_e: MouseEvent<HTMLButtonElement>) => {
    placeOrder()
  }

  return (
    <Stack
      spacing={2}
      width={{
        xs: "80%",
        lg: "70%",
      }}
      alignItems="center"
    >
      <CheckTerms />
      <FormControl component="fieldset">
        <RadioGroup
          value={paymentType}
          onChange={handleChange}
        >
          <StyledFormLabel
            value={PaymentTypeEnum.CARD}
            control={<StyledRadio />}
            label={
              <FormattedMessage
                id="paymentWay.card.text"
                defaultMessage="Tarjeta de crédito/ débito"
              />
            }
          />
          {
            paymentType === PaymentTypeEnum.CARD && (
              <CuaierPayButton onPaySuccess={placeOrder} terms={terms} />
            )
          }
          <StyledFormLabel
            value={PaymentTypeEnum.TRANSFER}
            control={<StyledRadio />}
            label={
              <FormattedMessage
                id="paymentWay.transfer.text"
                defaultMessage="Transferencia bancaria"
              />
            }
          />
          {
            paymentType === PaymentTypeEnum.TRANSFER && (
              <BankTransferInfo
                onPlaceOrder={placeOrder}
                terms={terms}
              />
            )
          }
          <StyledFormLabel
            value={PaymentTypeEnum.CASH}
            control={<StyledRadio />}
            label={
              <FormattedMessage
                id="paymentWay.cash.text"
                defaultMessage="Pago en efectivo"
              />
            }
          />
          {
            paymentType === PaymentTypeEnum.CASH && (
              <PayButton
                onClick={handlePayButton}
                terms={terms}
              >
                <FormattedMessage
                  id="finishOrder.button.text"
                  defaultMessage="Finalizar compra"
                />
              </PayButton>
            )
          }
        </RadioGroup>
      </FormControl>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={savingOrder}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </Stack>
  )
}
