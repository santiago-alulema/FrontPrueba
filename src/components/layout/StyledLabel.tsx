import { InputLabel, InputLabelProps } from "@mui/material";

export const StyledLabel = ({ sx, ...restProps }: InputLabelProps) => (
  <InputLabel
    sx={{
      "&.Mui-focused, &.MuiFormLabel-filled": {
        color: 'primary.main',
      },
      ...sx
    }}
    {...restProps}
  />
);
