import { Stack, Typography } from "@mui/material";
import { SearchBox } from "components/layout";
import { useProductFilter } from "context/product-filter";
import React from "react";
import { FormattedMessage } from "react-intl";

export type FilterSearchBoxProps = {
}

export const FilterSearchBox = ({ }: FilterSearchBoxProps) => {
  const { setSearchQuery } = useProductFilter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography
        variant="h5"
        sx={{
          mt: 3,
        }}
      >
        <FormattedMessage id="search.title" defaultMessage="Buscar" />
      </Typography>
      <SearchBox onSearch={handleSearch} placeholderIntl="search.category.placeholder" />
    </Stack>
  );
}