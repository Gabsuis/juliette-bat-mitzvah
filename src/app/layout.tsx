import type { Metadata } from 'next';
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
        url: '/Meta pic.jpeg',
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
    images: ['/Meta pic.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-base-100 antialiased">
        {children}
      </body>
    </html>
  );
}
