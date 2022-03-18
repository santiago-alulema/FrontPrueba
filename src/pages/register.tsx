import { Stack } from '@mui/material';
import { SEO } from 'components';
import { InnerContainer } from 'components/inner-container';
import { RadiColorLogo } from 'components/radi-color-logo';
import { RegisterForm } from 'features/register-form/register-form';
import React, { Fragment } from 'react';

export default function RegisterPage() {
  return (
    <Fragment>
      <SEO title="Registro" description="Crea tu cuenta en nuestro portal." />
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
        <RegisterForm />
      </Stack>
    </Fragment>
  )
}
