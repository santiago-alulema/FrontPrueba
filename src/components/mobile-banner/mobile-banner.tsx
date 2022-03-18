import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image, { MyCustomImageProps } from "components/image/image";
import React from "react";
import { FormattedMessage } from "react-intl";

type MobileBannerProps = {
  img: MyCustomImageProps['src'];
  alt: string;
  intlId: string;
  intlDefault: string;
  altIntlId?: string;
  altIntlDefault?: string;
}

export const MobileBanner = ({
  img,
  alt,
  intlId,
  intlDefault,
  altIntlId,
  altIntlDefault,
}: MobileBannerProps) => {
  const haveAlt = Boolean(altIntlId);
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-evenly"
      direction="row"
      sx={{
        height: "150px",
        backgroundColor: 'primary.main'
      }}
    >
      <Grid item xs={haveAlt ? 3 : 4} sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={img}
          alt={alt}
          layout="fill"
          objectFit="contain"
          objectPosition="bottom"
        />
      </Grid>
      {
        intlId &&
        <Grid item xs={haveAlt ? 4 : 5}>
          <Typography
            textAlign="left"
            variant="h4"
            sx={{
              transform: "rotate(-10deg)",
              mt: -3,
            }}
            color="primary.contrastText"
          >
            <FormattedMessage id={intlId} defaultMessage={intlDefault} />
          </Typography>
        </Grid>
      }
      {
        haveAlt &&
        <Grid item xs={5}>
          <Typography
            textAlign="left"
            variant="h5"
            sx={{
              transform: "rotate(-10deg)",
              mt: -3,
            }}
            color="primary.contrastText"
            fontFamily="panton"
            fontWeight="normal"
          >
            <FormattedMessage id={altIntlId} defaultMessage={altIntlDefault} />
          </Typography>
        </Grid>
      }
    </Grid>
  );
}