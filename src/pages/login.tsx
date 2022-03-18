import { Stack } from '@mui/material';
import { SEO } from 'components';
import { InnerContainer } from 'components/inner-container';
import { RadiColorLogo } from 'components/radi-color-logo';
import { useAuth } from 'context/auth/use-auth';
import { LoginContent } from 'features/login-content';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { HOME_PAGE } from 'site/navigation';

export default function LoginPage() {
  const { isLogged } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isLogged) {
      push(HOME_PAGE);
    }
  }, [isLogged])

  return (
    <Fragment>
      <SEO title="Inicio de sesión" description="Ingresa a nuestro portal para manejar tus ordenes." />
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
        component={InnerContainer}
      >
        <RadiColorLogo />
        <LoginContent />
      </Stack>
    </Fragment>
  )
}
