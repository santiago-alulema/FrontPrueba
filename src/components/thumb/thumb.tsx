import { Box, Theme } from '@mui/material';
import { alpha } from '@mui/system';
import clsx from 'clsx';
import Image, { MyCustomImageProps } from "components/image/image";
import React from "react";

export type ThumbProps = {
  src: MyCustomImageProps['src'];
  alt: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Thumb = ({ src, alt, selected, onClick }: ThumbProps) => {
  return (
    <Box
      className={clsx({ ['selected']: selected })}
      sx={{
        position: 'relative',
        height: 90,
        width: 90,
        padding: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'primary.main',
        cursor: 'pointer',
        '&:hover, &.selected': {
          borderWidth: 2,
          borderColor: 'secondary.main',
          backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.2),
        }
      }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
}