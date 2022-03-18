import { LinkOff } from '@mui/icons-material';
import { Backdrop, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { SEO } from 'components';
import { GoHomeButton } from 'components/go-home-button';
import { InnerContainer } from 'components/inner-container';
import { RadiColorLogo } from 'components/radi-color-logo';
import { ResetPasswordForm } from 'features/reset-password-form';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { ValidateRecoveryDto, ValidateRecoveryResponseDto } from 'types/dtos';
import { ApiErrorDto } from 'types/dtos/ApiErrorDto';
import { firstIfArray } from 'utils/array';

export default function ResetPasswordPage() {
  const [verifying, setVerifying] = useState(true);
  const [validLink, setValidLink] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { isReady, query: { guid, email } } = useRouter();

  const resetData: ValidateRecoveryDto = {
    email: firstIfArray(email),
    guid: firstIfArray(guid),
  }

  useEffect(() => {
    if (isReady) {
      verifyGuid();
    }
  }, [isReady])

  const verifyGuid = () => {
    usersRepository.validateRecovery({
      data: resetData,
    })
      .then((responseRecovery: ValidateRecoveryResponseDto) => {
        if (responseRecovery.valid) {
          setValidLink(true);
        }
      })
      .catch((e: ApiErrorDto) => {
        enqueueSnackbar(
          formatMessage({
            id: 'generalNotification.error.text',
            defaultMessage: 'Error {error}',
          }, {
            error: e.message,
          }),
          {
            variant: 'error',
          }
        );
      })
      .finally(() => setVerifying(false));
  }

  return (
    <Fragment>
      <SEO title="Restablecer contraseña" description="Restablece tu contraseña." />
      {
        verifying ? (
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={verifying}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )
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
            component={InnerContainer}
          >
            {
              validLink ?
                <Fragment>
                  <RadiColorLogo />
                  <ResetPasswordForm
                    email={resetData.email}
                    guid={resetData.guid}
                  />
                </Fragment>
                :
                <Stack
                  alignItems="center"
                  direction="column"
                  spacing={2}
                >
                  <Box
                    sx={{
                      "svg": {
                        height: 75,
                        width: 75,
                      }
                    }}
                  >
                    <LinkOff color="error" />
                  </Box>
                  <Typography
                    variant="h4"
                    color="primary"
                    textAlign="center"
                  >
                    <FormattedMessage
                      id="link.notValid.title"
                      defaultMessage="Enlace inválido"
                    />
                  </Typography>
                  <Typography
                    variant="body1"
                  >
                    <FormattedMessage
                      id="link.notValid.description"
                      defaultMessage="El enlace que ha utilizado ha caducado, no es válido, o ya ha sido utilizado."
                    />
                  </Typography>
                  <GoHomeButton />
                </Stack>
            }
          </Stack>
      }
    </Fragment>
  )
}

