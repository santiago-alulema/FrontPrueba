import { Stack } from '@mui/material';
import { ParagraphSkeleton } from 'components/paragraph-skeleton';
import { useAuth } from 'context/auth/use-auth';
import { AccountForm } from 'features/account-form';
import { AccountSecureForm } from 'features/account-secure-form';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { usersRepository } from 'repository';
import { ApiErrorDto } from 'types/dtos';
import { GetUserDto } from 'types/dtos/GetUserDto';

export const AccountContent = () => {
  const { token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const [userData, setUserData] = useState<GetUserDto>();

  useEffect(() => {
    usersRepository.whoIam({ key: token })
      .then((userInfo) => setUserData(userInfo))
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
  }, [])

  return (
    userData ?
      <Stack direction="column" spacing={2}>
        <AccountForm userInfo={userData} />
        <AccountSecureForm />
      </Stack>
      :
      <ParagraphSkeleton />
  )
}