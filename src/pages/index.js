import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UpcomingLaunches from './upcoming-launches';
import LaunchDetails from './launch-details';

import withRoot from '../withRoot';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
};

class Index extends React.Component {
  state = {
    isSideMenuOpen: false,
  };

  toggleSideMenu = (isSideMenuOpen) => () => {
    this.setState({ isSideMenuOpen });
  };

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleSideMenu(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Marketplace for space traveler
              </Typography>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            open={this.state.isSideMenuOpen}
            onClose={this.toggleSideMenu(false)}
            onOpen={this.toggleSideMenu(true)}
          >
            <div className={classes.list}>
              <List>
                <ListItem>
                  <Link to="/" onClick={this.toggleSideMenu(false)}>
                    <Typography variant="body1">Home</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/upcoming-launches" onClick={this.toggleSideMenu(false)}>
                    <Typography variant="body1">Upcoming launches</Typography>
                  </Link>
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
          <div>
            <Route exact path="/" component={UpcomingLaunches} />
            <Route path="/upcoming-launches" component={UpcomingLaunches} />
            <Route path="/launch-details/:launchId" component={LaunchDetails} />
          </div>
        </div>
      </Router>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
