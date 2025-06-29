import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Layout from "@/components/layout/layout";

type NextPageWithLayout = NextPage & {
  Layout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Layout'un varsayılan değeri true olacak
  const showLayout = Component.Layout !== false;

  if (!showLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
