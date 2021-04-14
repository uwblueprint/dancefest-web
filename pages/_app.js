import '@styles/globals.scss'; // Global styles
import '@styles/DatePicker.scss'; // Date Picker styles
import '@styles/Dropdown.scss'; // Dropdown styles

import { Provider } from 'next-auth/client'; // Authentication provider
import Event from '@containers/Event'; // Event State
import SnackbarProvider from 'react-simple-snackbar'; // Snackbar provider

export default function MyApp({ Component, pageProps }) {
  return (
    // Wrap children in authentication provider
    <Provider session={pageProps.session}>
      <Event.Provider>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </Event.Provider>
    </Provider>
  );
}
