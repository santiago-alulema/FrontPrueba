import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { FormControl, MenuItem, SelectChangeEvent, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { StyledLabel, StyledSelect } from "components/layout";
import { StyledTextField } from "components/layout/StyledTextField";
import { localization } from "constants/localization";
import { useCart } from "context/cart";
import dayjs from "dayjs";
import { ShippingEnum } from "enums";
import React, { FormEvent, useState } from "react";
import { FormattedMessage } from "react-intl";

interface FormData {
  firstName: { value: string };
  lastName: { value: string };
  phone: { value: string };
  reference: { value: string };
  addressLine1: { value: string };
  addressLine2: { value: string };
  province: { value: string };
  city: { value: string };
}

export const ShippingNormalForm = () => {
  const { setShipping } = useCart();
  const [fechaEntrega, setFechaEntrega] = React.useState<Date | null>(dayjs().add(3, 'day').toDate());
  const [filterProvinceIndex, setFilterProvinceIndex] = useState(0);
  const [cityId, setCityId] = useState(localization[0].sublevel![0].id);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      phone,
      reference,
      addressLine1,
      city,
    } = e.target as typeof e.target & FormData;

    setShipping({
      type: ShippingEnum.SHIPPING_NORMAL,
      estimatedDate: fechaEntrega?.toISOString(),
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      address: {
        reference: reference.value,
        addressLine1: addressLine1.value,
        city: city.value,
      },
    })
  }

  const handleChangeProvince = (event: SelectChangeEvent<unknown>) => {
    setFilterProvinceIndex(Number(event.target.value));
  };

  const handleChangeCity = (event: SelectChangeEvent<unknown>) => {
    setCityId(event.target.value as string);
  };

  const handleChangeFechaEntrega = (newValue: Date | null) => {
    setFechaEntrega(newValue);
  };

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
        placeholder="Nombre" />
      <StyledTextField
        name="lastName"
        label="Apellido"
        placeholder="Apellido" />
      <StyledTextField
        name="phone"
        label="Número de celular"
        placeholder="0999999999" />
      <FormControl>
        <StyledLabel id="provinceLabel">
          Provincia
        </StyledLabel>
        <StyledSelect
          label="Provincia"
          name="province"
          labelId="provinceLabel"
          onChange={handleChangeProvince}
          value={filterProvinceIndex}
        >
          {
            localization.map(({ name }, index) => (
              <MenuItem
                key={name}
                value={index}
              >
                {name}
              </MenuItem>
            ))
          }
        </StyledSelect>
      </FormControl>
      <FormControl key={filterProvinceIndex}>
        <StyledLabel id="cityLabel">
          Canton
        </StyledLabel>
        <StyledSelect
          label="Canton"
          name="city"
          labelId="cityLabel"
          onChange={handleChangeCity}
          value={cityId}
        >
          {
            (localization[filterProvinceIndex].sublevel ?? [])
              .map(({ id, name }) => (
                <MenuItem
                  key={name}
                  value={id}
                >
                  {name}
                </MenuItem>
              ))
          }
        </StyledSelect>
      </FormControl>
      <StyledTextField
        name="addressLine1"
        label="Dirección"
        placeholder="0999999999"
      />
      <StyledTextField
        name="reference"
        label="Referencia del domicilio"
        placeholder="0000"
        multiline
        rows={3}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Fecha y hora de entrega"
          value={fechaEntrega}
          onChange={handleChangeFechaEntrega}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}
        />
      </LocalizationProvider>
      <Button type="submit" color="secondary" sx={{ borderRadius: 0, mb: 2 }} variant="contained">
        <FormattedMessage
          id="proceedToPayment.button.text"
          defaultMessage="Proceder a pago"
        />
      </Button>
    </Stack>
  )
}
