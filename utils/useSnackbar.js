import { useSnackbar as useSnackbarImport } from 'react-simple-snackbar'; // Re-export useSnackbar hook

const options = {
  position: 'bottom-right',
  // style: {
  //   backgroundColor: 'midnightblue',
  //   border: '2px solid lightgreen',
  //   color: 'lightblue',
  //   fontFamily: 'Menlo, monospace',
  //   fontSize: '20px',
  //   textAlign: 'center',
  // },
  // closeStyle: {
  //   color: 'lightcoral',
  //   fontSize: '16px',
  // },
};

export default function useSnackbar() {
  return useSnackbarImport(options);
}
