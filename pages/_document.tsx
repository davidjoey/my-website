import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="no-scrollbar">
          <Main />
          <NextScript />
          <div id="modal-portal"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
