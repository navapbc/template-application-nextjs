import type { getRequestConfig } from "next-intl/server";

type RequestConfig = Awaited<
  ReturnType<Parameters<typeof getRequestConfig>[0]>
>;

/**
 * Define the default formatting for date, time, and numbers.
 * @see https://next-intl-docs.vercel.app/docs/usage/configuration#formats
 */
export const formats: RequestConfig["formats"] = {
  number: {
    currency: {
      currency: "USD",
    },
  },
};
