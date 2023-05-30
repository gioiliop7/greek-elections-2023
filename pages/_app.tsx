import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local';

const noir = localFont({
  src: [
    {
      path: '../assets/noir-font/NoirPro-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/noir-font/NoirPro-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/noir-font/NoirPro-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/noir-font/NoirPro-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/noir-font/NoirPro-Heavy.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/noir-font/NoirPro-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/noir-font/NoirPro-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={noir.className}>
      <Component {...pageProps} />
    </main>
  );
}
