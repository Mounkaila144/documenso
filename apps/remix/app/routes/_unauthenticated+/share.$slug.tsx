import { redirect } from 'react-router';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

import type { Route } from './+types/share.$slug';

export function meta({ params: { slug } }: Route.MetaArgs) {
  return [
    { title: 'Icall26Sign - Share' },
    { description: 'I just signed a document in style with Icall26Sign!' },
    {
      property: 'og:title',
      content: 'Icall26Sign - Join the open source signing revolution',
    },
    {
      property: 'og:description',
      content: 'I just signed with Icall26Sign!',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/share/${slug}/opengraph`,
    },
    {
      name: 'twitter:site',
      content: '@documenso',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/share/${slug}/opengraph`,
    },
    {
      name: 'twitter:description',
      content: 'I just signed with Icall26Sign!',
    },
  ];
}

export const loader = ({ request }: Route.LoaderArgs) => {
  const userAgent = request.headers.get('User-Agent') ?? '';

  if (/bot|facebookexternalhit|WhatsApp|google|bing|duckduckbot|MetaInspector/i.test(userAgent)) {
    return null;
  }

  // Is hardcoded because this whole meta is hardcoded anyway for Icall26Sign.
  throw redirect('https://documenso.com');
};

export default function SharePage() {
  return <div></div>;
}
