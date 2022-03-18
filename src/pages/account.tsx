import { Stack, Typography } from '@mui/material';
import { InnerContainer } from 'components/inner-container';
import { ParagraphSkeleton } from 'components/paragraph-skeleton';
import { SEO } from 'components/Seo';
import { useAuth } from 'context/auth/use-auth';
import { AccountContent } from 'features/account-content';
import { LoginContent } from 'features/login-content';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AccountPage = () => {
  const { isLogged, rehydrated } = useAuth();

  return (
    <Stack
      direction="column"
      spacing={2}
      width={{
        xs: '90%',
        sm: !isLogged ? '70%' : undefined,
        md: !isLogged ? 'min(50%, 500px)' : undefined,
      }}
      alignItems="center"
      mx="auto"
      component={InnerContainer}
    >
      <SEO title="Manejo de cuenta" description="" />
      <Typography
        variant="h5"
        color="secondary"
        textAlign="center"
        sx={{
          textTransform: "uppercase",
        }}
        gutterBottom
      >
        <FormattedMessage
          id="myAccount.title"
          defaultMessage="Manejo de cuenta"
        />
      </Typography>
      {
        rehydrated ?
          isLogged ?
            <AccountContent />
            :
            <LoginContent />
          :
          <ParagraphSkeleton />
      }
    </Stack>
  );
};

export default AccountPage;