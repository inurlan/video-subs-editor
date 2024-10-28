import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// disable SSR in the whole project
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
