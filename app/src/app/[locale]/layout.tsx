/**
 * Root layout component, wraps all pages.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
import { Metadata } from "next";

import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { GovBanner, Grid, GridContainer } from "@trussworks/react-uswds";

import Footer from "src/components/Footer";
import Header from "src/components/Header";

import "src/styles/styles.scss";

import { pick } from "lodash";

export const metadata: Metadata = {
  title: "Home",
  icons: [`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/logo.svg`],
};

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({ children, params }: LayoutProps) {
  const t = useTranslations("components.Layout");
  const messages = useMessages();

  return (
    <html lang={params.locale}>
      <body>
        {/* Flex and min height sticks the footer to the bottom of the page */}
        <div className="display-flex flex-column minh-viewport">
          <a className="usa-skipnav" href="#main-content">
            {t("skip_to_main")}
          </a>
          <GovBanner
            language={params.locale.match(/^es-?/) ? "spanish" : "english"}
          />
          <NextIntlClientProvider
            locale={params.locale}
            messages={pick(messages, "components.Header")}
          >
            <Header />
          </NextIntlClientProvider>
          {/* Flex pushes the footer to the bottom of the page */}
          <main id="main-content" className="usa-section flex-fill">
            <GridContainer>
              <Grid row>
                <Grid col>{children}</Grid>
              </Grid>
            </GridContainer>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
