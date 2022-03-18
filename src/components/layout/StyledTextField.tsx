import { TextField, TextFieldProps, Theme } from "@mui/material";
import { alpha } from "@mui/system";

export type StyledTextFieldProps = Omit<TextFieldProps, 'variant'>;

export const StyledTextField = ({ sx, ...restProps }: StyledTextFieldProps) => (
  <TextField
    variant="outlined"
    sx={{
      "label": {
        "&:not(.Mui-error)": {
          "&.Mui-focused, &.MuiFormLabel-filled": {
            color: 'primary.main',
          }
        },
      },
      ".MuiOutlinedInput-root": {
        "&:not(.Mui-error)": {
          "&:hover, &.Mui-focused": {
            "fieldset": {
              borderColor: 'primary.main',
            }
          },
          "fieldset": {
            borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.5),
          },
        },
        "fieldset": {
          borderRadius: 1,
          borderWidth: 3,
        },
      },
      ...sx
    }}
    {...restProps}
  />
);
