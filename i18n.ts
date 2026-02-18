import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'fr', 'he'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});
