import { ListItemButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'components/Link';
import { categoryList } from 'constants/categoryList';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useUi } from '../../context/ui';

export default function CategoryDrawer() {
  const { isCategoriesOpen, toggleCategoriesDrawer } = useUi();

  const toggleDrawer = () => {
    toggleCategoriesDrawer();
  };

  return (
    <Drawer anchor="left" open={isCategoriesOpen} onClose={toggleDrawer}>
      <List>
        {categoryList.map(({ id, icon, intl, href, defaultMessage }) => (
          <ListItem
            key={id}
            disablePadding
            sx={{
              color: 'primary.main',
              '&:hover': {
                color: 'secondary.main'
              }
            }}
          >
            <ListItemButton>
              <Link
                href={href}
                sx={{
                  display: 'flex',
                  flex: 1,
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', fontSize: '2em' }}>
                  {
                    icon
                  }
                </ListItemIcon>
                <ListItemText
                  primary={<FormattedMessage id={intl} defaultMessage={defaultMessage} />}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}