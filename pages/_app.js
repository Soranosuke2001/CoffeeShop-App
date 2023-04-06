import React from "react";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <footer>
        <p>© 2023 Sora</p>
      </footer>
    </React.Fragment>
  );
}
