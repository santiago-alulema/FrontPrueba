
import { Stack } from '@mui/material';
import Image from 'components/image/image';
import Link from 'components/Link';
import { ImageProps } from 'next/image';
import { LinkProps as NextLinkProps } from 'next/link';
import React, { ReactNode } from 'react';

export type VerticalBannerProps = {
  imgUrl: ImageProps['src'],
  topComponent: ReactNode;
  bottomComponent?: ReactNode;
  href: NextLinkProps['href'];
}

export const VerticalBanner = ({
  imgUrl,
  topComponent,
  bottomComponent,
  href,
}: VerticalBannerProps) => {

  return (
    <Link
      href={href}
    >
      <Stack
        sx={{
          transition: 'transform .1s ease-in-out',
          height: '60vh',
          position: 'relative',
          '> div': {
            zIndex: -1,
          },
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3,
          },
        }}
        direction="column"
        justifyContent="space-between"
      >
        <Image
          src={imgUrl}
          alt="banner image"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
        {topComponent}
        {bottomComponent}
      </Stack>
    </Link>

  );
}