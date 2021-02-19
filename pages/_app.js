import "@styles/globals.scss"; // Global styles
import "react-datepicker/dist/react-datepicker.css"; // React datepicker styles

import { Provider } from "next-auth/client"; // Authentication provider

export default function MyApp({ Component, pageProps }) {
  return (
    // Wrap children in authentication provider
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
