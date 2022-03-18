import { FilterAlt } from "@mui/icons-material";
import { Badge, Button, Drawer } from "@mui/material";
import { useProductFilter } from "context/product-filter";
import React, { Fragment, PropsWithChildren, useState } from "react";
import { FormattedMessage } from "react-intl";

export type FilterButtonMobileProps = {
}

export const FilterButtonMobile = ({ children }: PropsWithChildren<FilterButtonMobileProps>) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { subcategories, priceRangeIndex, searchQuery } = useProductFilter();

  const filterCount = (subcategories?.length ?? 0) + (typeof priceRangeIndex === 'number' ? 1 : 0) + (searchQuery && searchQuery !== '' ? 1 : 0);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(s => !s);
  };

  return (
    <Fragment>
      <Badge
        badgeContent={filterCount}
        color="secondary"
        anchorOrigin={{
          horizontal: "left",
          vertical: "top"
        }}
        sx={{
          '& .MuiBadge-badge': {
            top: (theme) => theme.spacing(),
          },
        }}
      >
        <Button
          variant="outlined"
          startIcon={
            <FilterAlt fontSize="small" />
          }
          onClick={toggleDrawer}
          sx={{ mt: 1 }}
        >
          <FormattedMessage id="fiilter.title" defaultMessage="Filtros" />
        </Button>
      </Badge>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {children}
      </Drawer>
    </Fragment>
  );
}
