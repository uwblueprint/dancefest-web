import { useSnackbar as useReactSimpleSnackbar } from 'react-simple-snackbar'; // Re-export useSnackbar hook

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const options = {
  position: 'bottom-right',
};

export default function useSnackbar() {
  const [openSnackbar] = useReactSimpleSnackbar(options);

  const snackbarError = err => {
    if (err.response.status === UNAUTHORIZED) {
      openSnackbar(err.response.data);
    } else if (err.response.status === BAD_REQUEST) {
      openSnackbar(err.response.data.error);
    } else {
      openSnackbar('Unknown error');
    }
  };

  const snackbarSuccess = message => {
    openSnackbar(message);
  };

  return {
    snackbarSuccess,
    snackbarError,
  };
}
