import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  // Header Styling
  header_search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 'auto',
    marginRight: theme.spacing.unit
  },
  header_searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header_inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  header_inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },

  // Table Styling
  table_editButton: {
    border: '1px solid #cfcfcf',
    borderRadius: '40px'
  },

  // Dialog Styling
  dfdialog_title: {
    color: '#de2706',
    borderBottom: '1px solid #c4c4c4',
    margin: '0 35px',
    padding: '35px 0 15px 0px'
  },
  dfdialog_footer: {
    backgroundColor: '#F7F7F7',
    padding: '15px'
  },
  dfdialog_saveButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: '1px solid #4d4d4d',
    borderRadius: '40px'
  },
  dfdialog_cancelButton: {
    backgroundColor: '#d4d44',
    border: '1px solid #4d4d4d',
    borderRadius: '40px'
  }
});

export default styles;
