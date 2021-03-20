import '@styles/globals.scss'; // Global styles
import '@styles/DatePicker.scss'; // Date Picker styles
import '@styles/Dropdown.scss'; // Dropdown styles

import { Provider } from 'next-auth/client'; // Authentication provider
import Navigation from '@containers/Navigation'; // Navigation State

export default function MyApp({ Component, pageProps }) {
  return (
    // Wrap children in authentication provider
    <Provider session={pageProps.session}>
      <Navigation.Provider>
        <Component {...pageProps} />
      </Navigation.Provider>
    </Provider>
  );
}
