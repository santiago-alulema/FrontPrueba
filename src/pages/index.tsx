
import { CATEGORY_TODOS_PRODUCTOS } from '@constants';
import { Grid, Stack, Typography } from '@mui/material';
import { SEO } from 'components';
import Link from 'components/Link';
import { VerticalBanner } from 'components/vertical-banner';
import { categoryList } from 'constants/categoryList';
import { verticalBanners } from 'constants/verticalBanners';
import { HomeBanner } from 'features/home-banner';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

export default function Index() {
  return (
    <Fragment>
      <SEO title="Bueno Sencillo y Barato" description="RADI es una marca de supermercados contemporáneo que refleja dedicación, calidad y el cuidado de los productos que ofrece." />
      <Grid container direction="row" alignItems="center" pt={2}>
        <HomeBanner />
      </Grid>
      <Typography variant="h4" color="secondary" textAlign="center" p={2}>
        Categorías
      </Typography>
      <Grid container spacing={2}>
        {
          categoryList
            .filter(cat => cat.id !== CATEGORY_TODOS_PRODUCTOS)
            .map(({ id, icon, intl, defaultMessage, href }) => (
              <Grid
                item
                key={id}
                xs={4}
                sm={3}
                md={2}
                textAlign="center"
              >
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  component={Link}
                  href={href}
                  display="inline-flex"
                  sx={{
                    '&:hover': {
                      svg: {
                        color: 'secondary.main',
                      }
                    }
                  }}
                >
                  <Typography variant="h2" color="primary" component="span"
                    sx={{
                      backgroundColor: '#f5f2e9',
                      p: 2,
                      display: 'flex',
                    }}
                  >
                    {
                      icon
                    }
                  </Typography>
                  <Typography variant="subtitle2" color="secondary">
                    <FormattedMessage
                      id={intl}
                      defaultMessage={defaultMessage}
                    />
                  </Typography>
                </Stack>
              </Grid>
            ))
        }
      </Grid>
      <Grid
        container
        sx={{
          my: 2,
        }}
      >
        {
          verticalBanners.map(({ imgUrl, topComponent, bottomComponent, href }, i) => (
            <Grid
              key={i}
              item
              xs={6}
              sm={3}
            >
              <VerticalBanner
                imgUrl={imgUrl}
                topComponent={topComponent}
                bottomComponent={bottomComponent}
                href={href}
              />
            </Grid>
          ))
        }
      </Grid>
    </Fragment>
  );
}