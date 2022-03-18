import { Button } from '@mui/material';
import Link from 'components/Link';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HOME_PAGE } from 'site/navigation';

export type GoHomeButtonProps = {
}

export const GoHomeButton = ({ }: GoHomeButtonProps) => {
  return (
    <Button
      color="secondary"
      sx={{
        borderRadius: 0
      }}
      variant="contained"
      LinkComponent={Link}
      href={HOME_PAGE}
    >
      <FormattedMessage
        id="returnHome.button.text"
        defaultMessage="Go Home"
      />
    </Button>
  )
}
