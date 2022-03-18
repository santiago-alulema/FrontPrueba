import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { StyledTextField } from "components/layout/StyledTextField";
import { useCart } from "context/cart";
import { ShippingEnum } from "enums";
import React, { FormEvent } from "react";
import { FormattedMessage } from "react-intl";

interface FormData {
  firstName: { value: string };
  lastName: { value: string };
  phone: { value: string };
}


export const ShippingPickUpForm = () => {
  const { setShipping } = useCart();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      phone,
    } = e.target as typeof e.target & FormData;

    setShipping({
      type: ShippingEnum.PICKUP_IN_PERSON,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
    })
  }

  return (
    <Stack
      spacing={2}
      width={{
        xs: "70%",
        lg: "50%",
      }}
      mb={2}
      component="form"
      onSubmit={handleSubmit}
    >
      <StyledTextField
        name="firstName"
        label="Nombre"
        placeholder="Nombre"
      />
      <StyledTextField
        name="lastName"
        label="Apellido"
        placeholder="Apellido"
      />
      <StyledTextField
        name="phone"
        label="Número de celular"
        placeholder="0999999999"
      />
      <Button type="submit" color="secondary" sx={{ borderRadius: 0, mb: 2 }} variant="contained">
        <FormattedMessage
          id="proceedToPayment.button.text"
          defaultMessage="Proceder a pago"
        />
      </Button>
    </Stack>
  )
}
