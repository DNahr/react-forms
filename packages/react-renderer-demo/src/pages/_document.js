import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from '../theme';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="Data Driven Forms" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/192x192.png"></link>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Montserrat:700&display=swap" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
          <link rel="stylesheet" type="text/css" href="https://wpcc.io/lib/1.0.2/cookieconsent.min.css" />
          <script src="https://wpcc.io/lib/1.0.2/cookieconsent.min.js"></script>
          <style
            dangerouslySetInnerHTML={{
              __html: `
          html {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          *, *::before, *::after {
            box-sizing: inherit;
          }
          strong, b {
            font-weight: bolder !important;
          }
          body {
            color: rgba(0, 0, 0, 0.87) !important;
            margin: 0 !important;
            font-size: 0.875rem !important;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
            font-weight: 400 !important;
            line-height: 1.43 !important;
            letter-spacing: 0.01071em !important;
            background-color: #fafafa !important;
          }`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-164334905-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                if(!window.location.origin.includes("localhost")) {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
  
                  gtag('config', 'UA-164334905-1');
                }
              })()
                `
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.addEventListener("load", function(){window.wpcc.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#f6f6f6","text":"#000000","border":"#555555"},"button":{"background":"#555555","text":"#ffffff"}}})});`
            }}
          />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  };
};

export default MyDocument;
