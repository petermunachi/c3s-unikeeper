import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      { //@ts-ignore
        <Component {...pageProps} />
      }
      <ToastContainer autoClose={10000} />
    </SessionProvider>
  );
}

export default MyApp;
