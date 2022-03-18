import { Box } from '@mui/material';
import LogoImage from 'assets/logo/logo_blanco.svg';
import Image from 'components/image/image';
import Link from 'components/Link';
import React from 'react';
import { HOME_PAGE } from 'site/navigation';

export default function AppLogo() {

  return (
    <Box sx={{
      width: 50,
      height: 50,
      position: 'relative',
    }}>
      <Link
        href={HOME_PAGE}
      >
        <Image
          src={LogoImage}
          alt={'Logo'}
          layout="fill"
          objectFit="contain"
        />
      </Link>
    </Box>
  );
}