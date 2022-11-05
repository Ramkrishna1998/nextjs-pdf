import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    html: string;
    head?: (JSX.Element | null)[] | undefined;
    styles?:
      | React.ReactElement<string, string | React.JSXElementConstructor<string>>[]
      | React.ReactFragment
      | undefined;
  }> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <title>SHREE HALARI VISA OSWAL SAMAJ, AHMEDABAD</title>
        <meta charSet='UTF-8' />
        <meta
          name='keywords'
          content='vercel, visa, oswal, visaoswal, halari, halari visa oswal, samaj, ahmedabad'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='author' content='Kaushal Shah, Bhargav Shah' />
        <meta name='description' content='Form To collect user informtaion' />
        <meta property='og:title' content='SHREE HALARI VISA OSWAL SAMAJ, AHMEDABAD' />
        <meta property='og:description' content='visa oswal website.' />
        <meta property='og:url' content='https://visaoswal.vercel.app/' />
        <meta property='og:type' content='visa oswal website' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />

        {/* <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' /> */}

        <link rel='apple-touch-icon' href='/icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#fff' />

        {/* <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
