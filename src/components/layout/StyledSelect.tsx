import { Select, SelectProps } from "@mui/material";

export const StyledSelect = ({ sx, ...restProps }: SelectProps) => (
  <Select
    variant="outlined"
    sx={{
      "&.MuiOutlinedInput-root": {
        "&:hover, &.Mui-focused": {
          "fieldset": {
            borderColor: 'primary.main',
          },
        },
        "fieldset": {
          borderRadius: 1,
          borderWidth: 3,
          borderColor: 'secondary.main',
        },
      },
      ...sx
    }}
    {...restProps}
  />
);
