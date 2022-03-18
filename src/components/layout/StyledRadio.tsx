import { CheckBox, CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import { FormControlLabel, FormControlLabelProps, Radio, RadioProps } from "@mui/material";

export const StyledRadio = ({ sx, ...restProps }: RadioProps) => (
  <Radio
    icon={<CheckBoxOutlineBlankOutlined />}
    checkedIcon={<CheckBox />}
    sx={{
      "&.Mui-checked": {
        color: 'secondary.main',
      },
      ...sx
    }}
    {...restProps}
  />
);

export const StyledFormLabel = ({ sx, ...restProps }: FormControlLabelProps) => (
  <FormControlLabel
    sx={{
      ...sx
    }}
    {...restProps}
  />
);