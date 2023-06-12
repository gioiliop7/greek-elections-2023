import Head from "next/head";

const Header = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Greek Elections Results</title>
        <meta name="author" content="Giorgos Iliopoulos" />
        <meta name="description" content="View greek elections results on another way." />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Greek Elections Results" />
        <meta
          property="og:description"
          content="View greek elections results on another way."
        />
        <meta property="og:image" content="https://portal.singularlogic.eu/storage/app/uploads/public/646/f42/9fa/thumb_264_0_0_0_0_auto.png" />
        <meta property="og:url" content="https://github.com/gioiliop7/greek-elections-2023" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Greek Elections Results" />
        <meta
          name="twitter:description"
          content="View greek elections results on another way."
        />
        <meta name="twitter:image" content="https://portal.singularlogic.eu/storage/app/uploads/public/646/f42/9fa/thumb_264_0_0_0_0_auto.png" />
        <meta name="robots" content="all" />
        <meta name="robots" content="index,follow" />
      </Head>
    </>
  );
};

export default Header;
