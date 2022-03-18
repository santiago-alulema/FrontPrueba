import { Grid, Typography } from "@mui/material";
import { NotFoundLargeIcon } from "assets/icons";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function NotFoundContent() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      padding={2}
      height="100%"
    >
      <Grid item xs={8}>
        <NotFoundLargeIcon
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
            id="notfound.text"
            defaultMessage="Not found"
          />
        </Typography>
      </Grid>
    </Grid>
  );
}