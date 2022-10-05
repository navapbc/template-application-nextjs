import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props): ReactElement => {
  const { t } = useTranslation("common");

  return (
    <div className="container">
      <header /* add your agency's header class here */>
        <em>{t("Layout.header")}</em>
      </header>
      <main className="grid-container">
        <div className="grid-row">
          <div className="grid-col">{children}</div>
        </div>
      </main>
      <footer /* add your agency's footer class here */>
        <em>{t("Layout.footer")}</em>
      </footer>
    </div>
  );
};

export default Layout;
