import { Button, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { StyledFormLabel, StyledRadio, StyledTextField } from 'components/layout';
import { useCart } from 'context/cart';
import { TiposIdentificacionEnum } from 'enums';
import React, { ChangeEvent, FormEvent } from 'react';
import { FormattedMessage } from 'react-intl';

export type BillingInfoFormProps = {
  onComplete: () => void;
}

export default function BillingInfoForm({ onComplete }: BillingInfoFormProps) {
  const { customer, setCustomer } = useCart();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      identificationType: +event.target.value as TiposIdentificacionEnum,
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCustomer({
      ...customer,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onComplete();
  }

  return (
    <Stack
      spacing={2}
      width={{
        xs: "80%",
        lg: "70%",
      }}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <FormControl component="fieldset" required fullWidth>
        <FormLabel color="primary">Tipo de identificación</FormLabel>
        <RadioGroup
          row
          name="identificationType"
          value={customer.identificationType ?? TiposIdentificacionEnum.CEDULA}
          onChange={handleChange}
        >
          <StyledFormLabel
            value={TiposIdentificacionEnum.CEDULA}
            control={<StyledRadio />}
            label="Cédula"
          />
          <FormControlLabel
            value={TiposIdentificacionEnum.RUC}
            control={<StyledRadio />}
            label="RUC"
          />
          <FormControlLabel
            value={TiposIdentificacionEnum.PASAPORTE}
            control={<StyledRadio />}
            label="Pasaporte"
          />
        </RadioGroup>
      </FormControl>
      <StyledTextField
        name="identification"
        label="Identificación"
        onChange={handleInputChange}
        value={customer.identification}
        required
        fullWidth
      />
      <StyledTextField
        name="firstName"
        label="Nombre"
        onChange={handleInputChange}
        value={customer.firstName}
        required
        fullWidth
      />
      <StyledTextField
        name="lastName"
        label="Apellido"
        onChange={handleInputChange}
        value={customer.lastName}
        required
        fullWidth
      />
      <StyledTextField type="email"
        name="email"
        label="Correo electrónico"
        onChange={handleInputChange}
        value={customer.email}
        required
        fullWidth
      />
      <StyledTextField
        name="address"
        label="Dirección"
        onChange={handleInputChange}
        value={customer.address}
        required
        fullWidth
      />
      <StyledTextField
        name="zipCode"
        label="Código Postal"
        onChange={handleInputChange}
        value={customer.zipCode}
        fullWidth
      />
      <StyledTextField
        name="phone"
        label="Teléfono"
        onChange={handleInputChange}
        value={customer.phone}
        required
        fullWidth
      />

      <Button
        type="submit"
        color="secondary"
        sx={{ borderRadius: 0, }}
        variant="contained"
      >
        <FormattedMessage
          id="next.button.text"
          defaultMessage="Siguiente"
        />
      </Button>
    </Stack>
  )
}
