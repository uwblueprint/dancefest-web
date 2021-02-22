import '@styles/globals.scss'; // Global styles
import '@styles/global/Dropdown.scss'; // Dropdown styles
import '@styles/global/DatePicker.scss'; // Date Picker styles

import { Provider } from 'next-auth/client'; // Authentication provider

export default function MyApp({ Component, pageProps }) {
  return (
    // Wrap children in authentication provider
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
