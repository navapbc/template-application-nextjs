import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("health");
  return (
    <>
      <head>
        <title>{t("title")}</title>
      </head>
      <div>{t("healthy")}</div>
    </>
  );
}
