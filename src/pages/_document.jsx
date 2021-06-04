import Document, { Html, Head, Main, NextScript } from "next/document"
import PAGE from "config/page.config"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href={PAGE.favicon} rel="shortcut icon" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <body className="theme-dark">
          <Main />
          <NextScript />
          <div id='modal-root'></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
