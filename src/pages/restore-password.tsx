import { Stack } from '@mui/material';
import { SEO } from 'components';
import { InnerContainer } from 'components/inner-container';
import { RadiColorLogo } from 'components/radi-color-logo';
import { RestorePasswordForm } from 'features/restore-password-form';
import React, { Fragment } from 'react';

export default function RestorePasswordPage() {
  return (
    <Fragment>
      <SEO title="Recuperar contraseña" description="" />
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
        <RestorePasswordForm />
      </Stack>
    </Fragment>
  )
}
