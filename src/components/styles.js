import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  // flex
  flex: {
    display: 'flex'
  },
  flex_default: {
    display: 'flex',
    flex: '1 1 0'
  },

  // Link Styling
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.8'
    }
  },
  // Header Styling
  header_search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #DCDCDC',
    boxShadow: '2px 2px 2px #DCDCDC',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    minWidth: '300px'
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

  // Section Header Styling
  sectionHeaderWrapper: {
    textAlign: 'center',
    position: 'relative',
    marginTop: '25px',
    marginBottom: '25px'
  },
  sectionHeaderAction: {
    display: 'flex',
    position: 'absolute',
    top: '5px',
    right: '25px'
  },
  sectionHeaderBackButton: {
    display: 'flex',
    position: 'absolute',
    top: '5px',
    left: '25px'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 36,
    color: '#de2706'
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
  dfdialog_moreIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  dfdialog_footer: {
    backgroundColor: '#F7F7F7',
    padding: '15px'
  },
  readOnlyInput: {
    fontWeight: '500',
    '&:before': {
      borderBottom: 'none!important'
    },
    '&:hover': {
      borderBottom: 'none'
    },
    '&:after': {
      borderBottom: 'none'
    }
  },
  readOnlyLabel: {
    color: 'gray!important'
  },

  // Button Styling
  button: {
    border: '1px solid #4d4d4d',
    borderRadius: '40px',
    margin: 'auto 5px'
  },
  button_default: {
    backgroundColor: '#d4d44',
    borderColor: '#cfcfcf'
  },
  button_primary: {
    backgroundColor: 'black',
    color: '#fff'
  },
  button_secondary: {
    backgroundColor: '#c61100',
    color: '#fff',
    borderColor: '#c61100'
  },
  button_outline: {
    color: '#c61100',
    borderColor: '#cfcfcf'
  },
  button_disabled: {
    opacity: 0.7,
    cursor: 'no-drop',
    color: '#fff!important'
  },
  button_transparent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },

  // Filter SubMenu Item Styling
  subMenuItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subMenuOptions: {
    maxHeight: '500px',
    overflowY: 'scroll',
    outline: 'none',
    padding: '15px;'
  },

  // Settings Styling
  settings_wrapper: {
    flex: 1,
    margin: '0 auto',
    maxWidth: '700px',
    textAlign: 'center',
    width: '80%'
  },
  settings_view: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    border: '1px solid #cfcfcf',
    display: 'flex',
    flexFlow: 'column',
    height: 'auto',
    marginTop: '15px',
    padding: '15px'
  },

  // Loading Styling
  loading_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10%'
  },

  // EmptyState Image Wrapper Styling
  emptyState_wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  emptyState_content: {
    marginTop: '100px',
    textAlign: 'center'
  },
  emptyState_title: {
    fontSize: '20px',
    textAlign: 'center'
  },
  emptyState_subtitle: {
    textAlign: 'center'
  },

  // Settings Dropdown
  settingsDropdown_wrapper: {
    display: 'inline',
    marginLeft: '92%',
    cursor: 'pointer',
    color: 'white'
  }
});

export default styles;
