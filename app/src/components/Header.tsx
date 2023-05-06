import {
  GovBanner,
  NavMenuButton,
  PrimaryNav,
  Title,
  Header as USWDSHeader,
} from "@trussworks/react-uswds";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";

const primaryLinks: {
  i18nKey: string;
  href: string;
}[] = [
  {
    i18nKey: "nav_link_home",
    href: "/",
  },
  {
    i18nKey: "nav_link_health",
    href: "/health",
  },
];

const Header = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "Header",
  });

  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const handleMobileNavToggle = () => {
    setIsMobileNavExpanded(!isMobileNavExpanded);
  };

  const navItems = primaryLinks.map((link) => (
    <Link href={link.href} key={link.href}>
      {t(link.i18nKey)}
    </Link>
  ));

  return (
    <>
      <div
        className={`usa-overlay ${isMobileNavExpanded ? "is-visible" : ""}`}
      />
      <GovBanner />
      <USWDSHeader basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title className="desktop:margin-top-2">
              <div className="display-flex flex-align-center">
                <span className="margin-right-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="width-3 desktop:width-5 text-bottom margin-right-05"
                    src={`${
                      process.env.NEXT_PUBLIC_BASE_PATH ?? ""
                    }/img/logo.svg`}
                    alt="Site logo"
                  />
                </span>
                <span className="font-sans-lg flex-fill">{t("title")}</span>
              </div>
            </Title>
            <NavMenuButton
              onClick={handleMobileNavToggle}
              label={t("nav_menu_toggle")}
            />
          </div>
          <PrimaryNav
            items={navItems}
            mobileExpanded={isMobileNavExpanded}
            onToggleMobileNav={handleMobileNavToggle}
          ></PrimaryNav>
        </div>
      </USWDSHeader>
    </>
  );
};

export default Header;
