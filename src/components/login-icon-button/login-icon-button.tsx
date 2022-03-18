import { PersonOutline } from "@mui/icons-material";
import { Grid, IconButton, IconButtonProps, Menu, MenuItem } from "@mui/material";
import Link from "components/Link";
import { useAuth } from "context/auth/use-auth";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CONTEXT_MENU_LOGIN, HOME_PAGE, LOGIN_PAGE } from "site/navigation";

type LoginIconButtonProps = {
  iconColor?: IconButtonProps['color'],
}

export const LoginIconButton = ({ iconColor = "primary" }: LoginIconButtonProps) => {
  const { isLogged, logout } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openContextMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { push } = useRouter();
  const Logout = () => {
    handleClose()
    logout()
    push(HOME_PAGE)
    
  }
  return (
    <Grid component="div">
    { isLogged ?
    <Grid>
      <IconButton aria-label="user" size="small" 
      color={iconColor} id="basic-button" onClick={handleClick}
      aria-controls="basic-menu"
      aria-haspopup="true"
      aria-expanded={openContextMenu ? 'true' : undefined}>
        <PersonOutline fontSize="medium" />
      </IconButton> 
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openContextMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          CONTEXT_MENU_LOGIN.map(({id, href, intl, defaultMessage}) => (
            <Link
                key={id}
                href={href}
              >
              <MenuItem  onClick={handleClose}>
                <FormattedMessage id={intl} defaultMessage={defaultMessage} />
              </MenuItem>
            </Link>
          ))
        }
        <MenuItem onClick={Logout}>
        <FormattedMessage id="contextMenuLogin.logout" defaultMessage="Cerrar sesión"/>
        </MenuItem>
      </Menu>
    </Grid> :
      <IconButton LinkComponent={Link} href={LOGIN_PAGE} aria-label="cart" size="small" color={iconColor}>
        <PersonOutline fontSize="medium" />
      </IconButton>
    }
    </Grid>
  );
}