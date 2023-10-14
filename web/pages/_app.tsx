'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from 'react-redux';
import { store } from '@/store';

config.autoAddCss = false; 

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
