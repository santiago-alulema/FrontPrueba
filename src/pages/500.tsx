import { Grid, Typography } from "@mui/material";
import { ServerErrorLargeIcon } from "assets/icons";
import { SEO } from "components";
import React, { Fragment } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export default function Custom500Page() {
  const { formatMessage } = useIntl();

  return (
    <Fragment>
      <SEO title={formatMessage({ id: "serverError.text", defaultMessage: "Internal server error" })} description="" />
      <SEO title="Lo sentimos, para" description="" />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        padding={2}
        height="100%"
      >
        <Grid item xs={8}>
          <ServerErrorLargeIcon
            sx={{
              height: "100%",
              width: "100%",
            }}
          />
        </Grid>
        <Grid item mt={4}>
          <Typography
            variant="h5"
            color="secondary"
            sx={{
              textTransform: "uppercase",
            }}
            fontFamily="panton"
          >
            <FormattedMessage
              id="serverError.text"
              defaultMessage="Internal server error"
            />
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}