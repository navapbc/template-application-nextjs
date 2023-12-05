import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/Layout";

import "../styles/styles.scss";

import { defaultLocale, formats, Messages } from "src/i18n";

import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps<{ messages: Messages }>) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/logo.svg`}
        />
      </Head>
      <NextIntlClientProvider
        formats={formats}
        locale={router.locale ?? defaultLocale}
        messages={pageProps.messages}
      >
        <Layout locale={router.locale}>
          <Component {...pageProps} />
        </Layout>
      </NextIntlClientProvider>
    </>
  );
}

export default MyApp;
