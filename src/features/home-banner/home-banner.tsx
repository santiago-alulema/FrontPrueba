
import { Grid, Link, Skeleton } from '@mui/material';
import Image from 'components/image/image';
import { useHomeBanner } from 'hooks';
import React from 'react';
import { HOME_PAGE } from 'site/navigation';

export const HomeBanner = () => {
  const { data: bannerData, loading } = useHomeBanner();

  return (
    <Grid item xs={12} sx={{ position: 'relative' }}>
      {
        loading ?
          <Skeleton height={700} width="100%"></Skeleton>
          :
          <Link href={bannerData?.href ?? HOME_PAGE}>
            <Image
              src="https://wise.radimercado.com/Imagenes/ImagenesBaner/home_banner_2400_optimized_bfd73a240b.png"
              alt="home banner"
              objectFit="contain"
              height={700}
              width={1200}
              priority
            />
          </Link>
      }
    </Grid>
  );
}
