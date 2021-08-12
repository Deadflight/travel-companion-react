import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.dark.bg,
    color: theme.dark.text
  },
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
    color: theme.dark.text
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    color: theme.dark.text
  },
  button: {
    color: theme.dark.text
  }
}));