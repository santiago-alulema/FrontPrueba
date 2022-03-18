import { WhatsApp } from '@mui/icons-material';
import { Stack, SvgIconProps, Typography, TypographyProps } from '@mui/material';
import Link from 'components/Link';
import React from 'react';

export type WhatsappLinkProps = {
  number: string;
  message: string;
  typographyVariant?: TypographyProps['variant'];
  fontSize?: SvgIconProps['fontSize'];
  color?: any;
}

export const WhatsappLink = ({ number, message, typographyVariant = 'h6', fontSize, color = 'inherit' }: WhatsappLinkProps) => {
  return (
    <Link
      href={`https://api.whatsapp.com/send?phone=${number}&text=${message}`}
      target="_blank"
      underline="none"
      color={color}
    >
      <Stack direction="row" spacing={1} alignItems="center" color={color}>
        <Typography variant={typographyVariant} fontWeight="bold" color={color}>
          {
            number
          }
        </Typography>
        <WhatsApp color={color} fontSize={fontSize} />
      </Stack>
    </Link>
  );
}