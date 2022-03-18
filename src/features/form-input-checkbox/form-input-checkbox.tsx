
import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';
import React from 'react';
import { Control, Controller } from "react-hook-form";

export type FormInputCheckboxProps = {
  name: string;
  control: Control<any>;
  defaultValue: boolean;
  labelProps: Omit<FormControlLabelProps, 'control'>;
}

export const FormInputCheckbox = ({ name, control, defaultValue, labelProps, }: FormInputCheckboxProps) => {

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Checkbox
              {...field}
              color="secondary"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      }
      {...labelProps}
    />
  )
}
