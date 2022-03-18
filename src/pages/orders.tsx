import { Stack, Typography } from '@mui/material';
import { InnerContainer } from 'components/inner-container';
import { ParagraphSkeleton } from 'components/paragraph-skeleton';
import { SEO } from 'components/Seo';
import { useAuth } from 'context/auth/use-auth';
import { LoginContent } from 'features/login-content';
import { OrdersContent } from 'features/orders-content';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const OrdersPage = () => {
  const { isLogged, rehydrated } = useAuth();

  return (
    <InnerContainer>
      <SEO title="Mis órdenes" description="Histrial de órdenes" />
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
          id="orders.title"
          defaultMessage="Historial de compras"
        />
      </Typography>
      {
        rehydrated ?
          isLogged ?
            <OrdersContent />
            :
            <Stack
              direction="column"
              spacing={2}
              width={{
                xs: '90%',
                sm: '70%',
                md: 'min(50%, 500px)',
              }}
              alignItems="center"
              mx="auto"
            >
              <LoginContent />
            </Stack>
          :
          <ParagraphSkeleton />
      }
    </InnerContainer>
  );
};

export default OrdersPage;