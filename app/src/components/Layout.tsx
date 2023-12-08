import { pick } from "lodash";

import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { GovBanner, Grid, GridContainer } from "@trussworks/react-uswds";

import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  locale?: string;
};

const Layout = ({ children, locale }: Props) => {
  const t = useTranslations("components.Layout");
  const messages = useMessages();

  return (
    // Stick the footer to the bottom of the page
    <div className="display-flex flex-column minh-viewport">
      <a className="usa-skipnav" href="#main-content">
        {t("skip_to_main")}
      </a>
      <GovBanner language={locale?.match(/^es-?/) ? "spanish" : "english"} />
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, "components.Header")}
      >
        <Header />
      </NextIntlClientProvider>
      {/* grid-col-fill so that the footer sticks to the bottom of tall screens */}
      <main id="main-content" className="usa-section grid-col-fill">
        <GridContainer>
          <Grid row>
            <Grid col>{children}</Grid>
          </Grid>
        </GridContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
