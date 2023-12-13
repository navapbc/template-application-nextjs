import { GetServerSideProps } from "next";
import { getMessagesWithFallbacks } from "src/i18n/getMessagesWithFallbacks";

import React from "react";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: await getMessagesWithFallbacks(locale),
    },
  };
};

const Health = () => {
  return <>healthy</>;
};

export default Health;
