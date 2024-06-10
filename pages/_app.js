
// pages/_app.js
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Omnilh</title>
        <meta name="description" content="Omnilh excels in the creation and distribution of a diverse array of scarves. Annually, we unveil hundreds of innovative designs, reflecting our dedication to creativity. Our scarves are made from premium materials such as Rayon + Acrylic, Rayon, Cashmere, and Imitation Cashmere Embroidery, ensuring a wide appeal. Quality is paramount at Omnilh, and we prioritize customer satisfaction. Rigorous quality control measures are in place, guaranteeing each scarf meets our exacting standards. Despite this focus, we offer competitive pricing, ensuring value without compromise. Our commitment to quality and affordability has fostered strong client relationships and expanded our market presence. Trust Omnilh for scarves that embody quality, innovation, and value. " />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
