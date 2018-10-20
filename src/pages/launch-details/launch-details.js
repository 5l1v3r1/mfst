import React, { Component } from 'react';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class LaunchDetails extends Component {
  static propTypes = {
    classes: object.isRequired,
  };

  render() {
    return (
      <Typography variant="h2">Launch details</Typography>
    )
  }
}

export default withStyles(styles)(LaunchDetails);
