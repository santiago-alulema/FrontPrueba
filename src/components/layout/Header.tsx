import { AppBar, Container, Grid, Hidden, Skeleton, Stack, StackProps, Toolbar, Typography } from "@mui/material";
import Link from "components/Link";
import { useAuth } from "context/auth/use-auth";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { FormattedMessage } from "react-intl";
import { MAIN_MENU_AUTH_ITEMS, MAIN_MENU_ITEMS, SEARCH_PAGE } from "site/navigation";
import AppLogo from "./AppLogo";
import CategoryMenuIcon from "./CategoryMenuIcon";
import MobileCategoryMenuIcon from "./MobileCategoryMenuIcon";
import { RightMenu } from "./RightMenu";
import { SearchBox } from "./SearchBox";
import { SocialNetworks } from "./SocialNetworks";

type StyledToolbarProps = StackProps & {
  alternated?: boolean;
}

const StyledToolbar = (({ alternated, children, ...stackProps }: PropsWithChildren<StyledToolbarProps>) => {
  return (
    <Toolbar
      sx={{
        backgroundColor: alternated ? 'common.white' : undefined,
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          {...stackProps}
        >
          {children}
        </Stack>
      </Container>
    </Toolbar>
  )
});

export const Header = () => {
  const { push } = useRouter();
  const { isLogged, rehydrated } = useAuth();

  const handleSearch = (query: string) => {
    push({
      pathname: SEARCH_PAGE,
      query: { q: query },
    });
  };

  return (
    <AppBar position="fixed">
      <StyledToolbar>
        <Grid item container
          sx={{
            flexWrap: 'nowrap',
            width: 'auto',
          }}
          columnSpacing={1}
          alignItems="center"
        >
          <Hidden smUp>
            <Grid item>
              <MobileCategoryMenuIcon />
            </Grid>
          </Hidden>
          <Grid item>
            <AppLogo />
          </Grid>
        </Grid>
        <Grid item sm={5} md={4} xs>
          <SearchBox onSearch={handleSearch} />
        </Grid>
        <SocialNetworks />
      </StyledToolbar>
      <StyledToolbar
        alternated
        justifyContent={{
          xs: 'center',
          sm: 'space-between'
        }}
      >
        <Hidden smDown>
          <CategoryMenuIcon />
        </Hidden>
        <Stack
          direction="row"
          spacing={2}
        >
          {
            rehydrated ?
              (isLogged ? MAIN_MENU_AUTH_ITEMS : MAIN_MENU_ITEMS).map(({ id, href, intl, defaultMessage }) => (
                <Link
                  key={id}
                  href={href}
                >
                  <Typography variant="h6">
                    <FormattedMessage
                      id={intl}
                      defaultMessage={defaultMessage}
                    />
                  </Typography>
                </Link>
              ))
              :
              <Skeleton width="80%" />
          }
        </Stack>
        <RightMenu />
      </StyledToolbar>
    </AppBar>

  );
}