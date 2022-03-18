import Head from 'next/head';
import React from 'react';

type SeoProps = {
  title: string;
  description: string;
};

export const SEO = ({
  title,
  description,
}: SeoProps) => (
  <Head>
    <title>{`${title} | Radi`}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width,maximum-scale=1,initial-scale=1" />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content="Radi" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@radi" />
    <meta name="twitter:creator" content="@radi" />
  </Head>
);
