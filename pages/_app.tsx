import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local';
import Script from 'next/script'

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
    <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-BC3H9SKYFD"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BC3H9SKYFD', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
    <main className={noir.className}>
      <Component {...pageProps} />
    </main>
    </>
  );
}
