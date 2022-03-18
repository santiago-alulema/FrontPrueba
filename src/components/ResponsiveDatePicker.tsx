import { DatePickerProps, DesktopDatePicker, LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDayjs';
import { Theme, useMediaQuery } from "@mui/material";
import React from "react";

export const ResponsiveDatePicker = (props: DatePickerProps) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      {
        isMobile ?
          <MobileDatePicker {...props} />
          :
          <DesktopDatePicker {...props} />
      }
    </LocalizationProvider>
  )
}