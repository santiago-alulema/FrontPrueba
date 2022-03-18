import { BrokenImage } from '@mui/icons-material';
import NextImage, { ImageProps } from 'next/image';
import React from "react";

export type MyCustomImageProps = ImageProps & {
  showEmptyImage?: boolean;
  draggable?: boolean;
}

export default function Image({
  src,
  showEmptyImage = true,
  draggable = false,
  layout = "responsive",
  ...restProps
}: MyCustomImageProps) {
  return (
    src ?
      <NextImage
        // loader={cloudflareLoader}
        draggable={draggable}
        src={src}
        layout={layout}
        {...restProps}
      />
      :
      showEmptyImage ?
        <NextImage
          draggable={draggable}
          src={BrokenImage.toString()}
          alt="placeholder"
          layout={layout}
          width={270}
          height={240}
          {...restProps}
        />
        :
        null
  );
}
