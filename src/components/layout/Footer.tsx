import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "components/Link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { FOOTER_MENU } from "site/navigation";

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        color: "secondary.contrastText",
      }}
      component="footer"
      py={2}
    >
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            Radi Mercado
          </Grid>
          {
            FOOTER_MENU.map(({ id, href, intl, defaultMessage }) => (
              <Grid
                key={id}
                item
                xs={6}
                sm={4}
              >
                <Typography
                  variant="body2"
                  color="primary.contrastText"
                >
                  <Link
                    href={href}
                    color="inherit"
                    sx={{
                      '&:hover, &.active': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    <FormattedMessage
                      id={intl}
                      defaultMessage={defaultMessage}
                    />
                  </Link>
                </Typography>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );
}