import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HistoryIcon from '@material-ui/icons/History';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Menu, { MenuItem } from '../components/ui/Menu';
import UnstyledLink from '../components/ui/UnstyledLink';
import LoadingProgress from '../components/ui/LoadingProgress';
import { browserLogout } from '../utils/browserLogout';

const styles = theme => ({
  root: {
    backgroundColor: grey[900],
    color: grey[100],
    zIndex: theme.zIndex.drawer + 1,
  },
});

function TopAppBar({
  history,
  toggleMainMenu,
  toggleHistory,
  classes,
}) {
  const username = localStorage.getItem('vsUsername');
  const onLogout = () => {
    browserLogout();
    history.push('/login/');
  };
  const { REACT_APP_VIDISPINE_URL } = process.env;
  const { VIDISPINE_SERVER_URL } = window;
  const displayUrl = VIDISPINE_SERVER_URL === '$VIDISPINE_URL' ? REACT_APP_VIDISPINE_URL : VIDISPINE_SERVER_URL;
  return (
    <AppBar elevation={0} classes={{ root: classes.root }} position="fixed">
      <Toolbar disableGutters variant="dense">
        <IconButton onClick={toggleMainMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <IconButton onClick={toggleHistory} color="inherit">
          <HistoryIcon />
        </IconButton>
        <Typography variant="subheading" color="inherit" style={{ flex: 1 }}>
          {displayUrl || window.location.origin}
        </Typography>
        <Menu icon={<AccountCircle />} iconProps={{ color: 'inherit' }}>
          <MenuItem disabled>
            <Typography>{`User: ${username}`}</Typography>
          </MenuItem>
          <UnstyledLink to={`/user/${username}`}>
            <MenuItem>
              <Typography color="inherit">Profile</Typography>
            </MenuItem>
          </UnstyledLink>
          <UnstyledLink to={`/import/access/${username}`}>
            <MenuItem>
              <Typography color="inherit">Import Access</Typography>
            </MenuItem>
          </UnstyledLink>
          <MenuItem onClick={onLogout}>
            <Typography color="error">Sign out</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
      <LoadingProgress />
    </AppBar>
  );
}

export default withStyles(styles)(TopAppBar);
