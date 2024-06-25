import { useTranslations } from "next-intl";
import React, { Suspense } from "react";

import InstantLoadGreeting from "./InstantLoadGreeting";
import Loader from "./loader";
import Todos1SecLoad from "./Todos1SecLoad";
import Todos2SecLoad from "./Todos2SecLoad";

export default function Page() {
  const t = useTranslations("suspense");
  return (
    <>
      <h1>{t("title")}</h1>
      <InstantLoadGreeting />
      <div className="grid-row grid-gap">
        <div className="tablet:grid-col-6">
          <Suspense
            fallback={<Loader message="This should take 1 second to load" />}
          >
            <Todos1SecLoad />
          </Suspense>
        </div>
        <div className="tablet:grid-col-6">
          <Suspense
            fallback={<Loader message="This should take 2 seconds to load" />}
          >
            <Todos2SecLoad />
          </Suspense>
        </div>
      </div>
    </>
  );
}
