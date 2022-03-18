import { Stack, Typography } from '@mui/material';
import { InnerContainer } from 'components/inner-container';
import { ParagraphSkeleton } from 'components/paragraph-skeleton';
import { SEO } from 'components/Seo';
import { useAuth } from 'context/auth/use-auth';
import { BudgetNestedContainer } from 'features/budget-widget';
import { LoginContent } from 'features/login-content';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const MyBudgetPage = () => {
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
      <SEO title="Mi chanchito" description="" />
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
          id="myBudget.title"
          defaultMessage="Mi chanchito"
        />
      </Typography>
      {
        rehydrated ?
          isLogged ?
            <BudgetNestedContainer />
            :
            <LoginContent />
          :
          <ParagraphSkeleton />
      }
    </Stack>
  );
};

export default MyBudgetPage;