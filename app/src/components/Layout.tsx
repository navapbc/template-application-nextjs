import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props): ReactElement => {
  const { t } = useTranslation("common");

  return (
    <div>
      <header /* add your agency's or USWDS's header here */>
        <em>{t("Layout.header")}</em>
      </header>
      <main className="grid-container">
        <div className="grid-row">
          <div className="grid-col">{children}</div>
        </div>
      </main>
      <footer /* add your agency's or USWDS's footer here */>
        <em>{t("Layout.footer")}</em>
      </footer>
    </div>
  );
};

export default Layout;
