import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import '@/styles/globals.css';

const siteUrl = 'https://juliette-bat-mitzvah.vercel.app';

export const metadata: Metadata = {
  title: "Juliette's Bat Mitzvah - Tel Aviv 2026",
  description: "Join us to celebrate Juliette's Bat Mitzvah in Tel Aviv! A beach & ocean celebration by the Mediterranean Sea.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Juliette's Bat Mitzvah - Tel Aviv 2026",
    description: "Join us to celebrate Juliette's Bat Mitzvah in Tel Aviv! A beach & ocean celebration by the Mediterranean Sea.",
    url: siteUrl,
    siteName: "Juliette's Bat Mitzvah",
    images: [
      {
        url: '/engagement.jpg',
        width: 1200,
        height: 630,
        alt: "Juliette's Bat Mitzvah - Tel Aviv 2026",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Juliette's Bat Mitzvah - Tel Aviv 2026",
    description: "Join us to celebrate Juliette's Bat Mitzvah in Tel Aviv! A beach & ocean celebration by the Mediterranean Sea.",
    images: ['/engagement.jpg'],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = locale === 'he';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-base-100 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
