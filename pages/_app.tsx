import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Layout from "@/components/layout/layout";
import PanelLayout from "@/components/layout/panel-layout";

type NextPageWithLayout = NextPage & {
  Layout?: boolean | 'panel';
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Layout kontrolü
  if (Component.Layout === false) {
    return <Component {...pageProps} />;
  }

  // Panel Layout kontrolü
  if (Component.Layout === 'panel') {
    return (
      <PanelLayout>
        <Component {...pageProps} />
      </PanelLayout>
    );
  }

  // Varsayılan Layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
