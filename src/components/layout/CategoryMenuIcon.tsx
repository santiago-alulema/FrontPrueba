import { Menu } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { MouseEvent } from 'react';
import { useUi } from '../../context/ui';

export default function CategoryMenuIcon() {

  const { toggleCategoriesDrawer } = useUi();

  const toggleDrawer = (_event: MouseEvent) => {
    toggleCategoriesDrawer();
  };

  return (
    <Button
      onClick={toggleDrawer}
      variant="contained"
      color="secondary"
      startIcon={<Menu />}
    >
      Categorías
    </Button>
  );
}