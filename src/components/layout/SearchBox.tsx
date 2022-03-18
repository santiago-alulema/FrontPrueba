import { Search } from "@mui/icons-material";
import { Box, InputBase, Theme } from "@mui/material";
import { alpha } from "@mui/system";
import { debounce } from "lodash";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

export type SearchBoxProps = {
  placeholderIntl?: string;
  onSearch: (query: string) => void;
}

export const SearchBox = ({
  placeholderIntl = "search.general.placeholder",
  onSearch,
}: SearchBoxProps) => {
  const { formatMessage } = useIntl();
  const placeholder = formatMessage({ id: placeholderIntl, defaultMessage: "Buscar producto" });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(e.target.value)
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleTextChange, 500),
    []
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,  // theme.shape.borderRadius * 1
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.8),
        '&:hover': {
          backgroundColor: 'common.white',  // theme.pallete
        },
        mr: 2,  //theme.spacing * 2
        ml: {
          xs: 0,
          sm: 3,
        },
        width: {
          xs: '100%',
          sm: 'auto',
        },
        color: 'primary.main',
      }}
    >
      <InputBase
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        sx={{
          color: 'inherit',
          width: '100%',
          ['.MuiInputBase-input']: {
            p: 1,
            pr: 4,
            transition: (theme: Theme) => theme.transitions.create('width'),
            width: {
              xs: '100%',
              md: '20ch'
            }
          }
        }}
        onChange={debouncedChangeHandler}
      />
      <Box
        sx={{
          px: 2,
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          right: 0,
        }}
      >
        <Search />
      </Box>
    </Box>
  );
}
