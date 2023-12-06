/**
 * @file Storybook decorator, enabling internationalization for each story.
 * @see https://storybook.js.org/docs/writing-stories/decorators
 */
import { StoryContext } from "@storybook/react";

import { NextIntlClientProvider } from "next-intl";
import React from "react";

import { defaultLocale, formats } from "../src/i18n/config";
import { getMessagesWithFallbacks } from "../src/i18n/getMessagesWithFallbacks";

const I18nStoryWrapper = (
  Story: React.ComponentType,
  context: StoryContext
) => {
  const locale = context.globals.locale ?? defaultLocale;

  return (
    <NextIntlClientProvider
      formats={formats}
      locale={locale}
      messages={getMessagesWithFallbacks(locale)}
    >
      <Story />
    </NextIntlClientProvider>
  );
};

export default I18nStoryWrapper;
