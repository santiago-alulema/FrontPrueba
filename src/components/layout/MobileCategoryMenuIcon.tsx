import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { MouseEvent } from 'react';
import { useUi } from '../../context/ui';

export default function MobileCategoryMenuIcon() {

  const { toggleCategoriesDrawer } = useUi();

  const toggleDrawer = (_event: MouseEvent) => {
    toggleCategoriesDrawer();
  };

  return (
    <IconButton
      sx={{
        color: 'common.white'
      }}
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={toggleDrawer}
    >
      <Menu />
    </IconButton>
  );
}