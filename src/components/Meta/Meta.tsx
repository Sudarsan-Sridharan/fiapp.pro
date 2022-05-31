import React from 'react';
import { Helmet } from 'react-helmet-async';

import { title as appTitle, defaultMetaTags } from '@/config';

import type { MetaProps } from './types';

function Meta({
  description = defaultMetaTags.description,
  meta = [],
  title,
  image = defaultMetaTags.image,
}: MetaProps) {
  const pageTitle = `${title ? title + ' -' : ''} ${appTitle}`;

  return (
    <Helmet
      title={pageTitle}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          name: 'twitter:card',
          content:
            'Smart trading system for everyone',
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ].concat(meta)}
    />
  );
}

export default Meta;
