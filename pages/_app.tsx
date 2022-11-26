import "styles/reset.scss";
import "styles/global.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "swiper/css";
import "swiper/css/navigation";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "components/ErrorBoundary";
import { Meta } from "components/Meta";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "store/global-store";
import Modal from "react-modal";
import { Authentication } from "components/Authentication";
import { ButtonScrollToTop } from "components/ButtonScrollToTop";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Meta />
        <Authentication>
          <Component {...pageProps} />
          <Toaster position="top-right" />
          <ButtonScrollToTop />
        </Authentication>
      </Provider>
    </ErrorBoundary>
  );
}
