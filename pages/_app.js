
// pages/_app.js
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Omnilh</title>
        <meta name="description" content="Omni Link Hub" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
