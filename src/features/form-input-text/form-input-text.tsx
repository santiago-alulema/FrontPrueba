
import { StyledTextField, StyledTextFieldProps } from 'components/layout';
import React from 'react';
import { Control, Controller } from "react-hook-form";

export type FormInputTextProps = Omit<StyledTextFieldProps, 'name'> & {
  name: string;
  control: Control<any>;
  defaultValue?: any;
}

export const FormInputText = ({ control, defaultValue, name, ...restprops }: FormInputTextProps) => {

  return (
    <Controller
      render={({ field: { ref, ...restFieldProps }, fieldState: { error } }) => (
        <StyledTextField
          inputRef={ref}
          error={!!error}
          helperText={error?.message}
          {...restprops}
          {...restFieldProps}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  )
}
