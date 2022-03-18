import { Button, Grid, Typography } from '@mui/material';
import { NoResultIcon } from 'assets/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type NoResultFoundProps = {
  showBackButton?: boolean;
};

const NoResultFound = ({ showBackButton = true }: NoResultFoundProps) => {
  const router = useRouter();

  function onClickButton() {
    router.back();
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      height="100%"
      wrap="nowrap"
    >
      <Grid item xs={8}>
        <NoResultIcon
          sx={{
            height: "100%",
            width: "100%",
          }}
        />
      </Grid>
      <Typography
        variant="h5"
        color="secondary"
        sx={{
          textTransform: "uppercase",
        }}
        fontFamily="panton"
      >
        <FormattedMessage
          id="noResultFound.text"
          defaultMessage="Sorry, No result found :("
        />
      </Typography>
      {
        showBackButton &&
        <Button onClick={onClickButton}>
          Go Back
        </Button>
      }
    </Grid>
  );
};

export default NoResultFound;
