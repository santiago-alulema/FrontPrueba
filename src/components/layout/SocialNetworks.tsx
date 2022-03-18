import { Facebook, Instagram } from '@mui/icons-material';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import { WhatsappLink } from 'components/whatsapp-link';
import { useCompanyContactInfo, useCompanySocialNetworks } from 'hooks';
import React, { PropsWithChildren } from 'react';
import Link from '../Link';

export const SocialNetworks = () => {
  const { data } = useCompanySocialNetworks({});
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { data: companyData } = useCompanyContactInfo({});

  return (
    <Grid
      container
      item
      alignItems="center"
      justifyContent="center"
      columnSpacing={1}
      sx={{
        width: 'auto',
        color: 'common.white',
      }}
    >
      <Grid item color="inherit">
        {
          companyData?.whatsappNumber &&
          <WhatsappLink
            number={companyData.whatsappNumber}
            message={companyData.whatsappMessage}
            typographyVariant={isMobile ? "caption" : "subtitle2"}
            fontSize={isMobile ? "medium" : "large"}
            color="white"
          />
        }
      </Grid>
      <SocialNetworkLink to={data?.instagramUrl ?? "https://www.instagram.com/"}>
        <Instagram color="inherit" fontSize={isMobile ? "medium" : "large"} />
      </SocialNetworkLink>
      <SocialNetworkLink to={data?.facebookUrl ?? "https://www.facebook.com/"}>
        <Facebook color="inherit" fontSize={isMobile ? "medium" : "large"} />
      </SocialNetworkLink>
    </Grid>
  );
}

type SocialNetworkLinkProps = {
  to: string;
}

export const SocialNetworkLink = ({ to, children }: PropsWithChildren<SocialNetworkLinkProps>) => {
  return (
    <Grid
      item
    >
      <Link
        href={to}
        target="_blank"
        sx={{
          color: 'common.white',
          ['&:hover']: {
            color: 'secondary.main',
          },
          display: 'flex'
        }}
      >
        {children}
      </Link>

    </Grid>
  );
}