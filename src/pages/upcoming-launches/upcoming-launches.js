import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import launches from '../../data/launches.json';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Stars';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  card: {
    height: '100%',
  },
  media: {
    objectFit: 'cover',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  payloadPercentage: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  payloadPercentageText: {
    lineHeight: 1.8,
    marginLeft: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: grey[50],
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class RecipeReviewCard extends React.Component {
  navigateToLaunchDetails = (launchId) => () => (
    this.props.history.push(`launch-details/${launchId}`)
  );

  renderPayloadPercentage(data) {
    const { classes } = this.props;
    const loadPercentage = 100 - Math.ceil((data.payload.freeForOrder / data.payload.total) * 100)
    return [
      <CircularProgress color={data.payload.freeForOrder > 0 ? 'secondary' : 'action'} size={26} className={classes.progress} variant="static" value={loadPercentage} />,
      <Typography component="div" className={classes.payloadPercentageText}>{loadPercentage}% loaded</Typography>
    ];
  }

  createContent() {
    const { classes } = this.props;

    return launches.map(data => {
      const ldate = data.net.split(' ');

      return (
        <Grid key={data.id} spacing={16} item xs={3}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt={data.lsp.name}
                  src={`${process.env.PUBLIC_URL}/${data.lsp.icon}`}
                  className={classes.avatar}
                >
                  {data.lsp.name[0]}
                </Avatar>
              }
              title={data.lsp.name}
              subheader={ldate[0]+' '+ldate[1]+' '+ldate[2]}/>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="150"
              image={data.rocket.imageURL}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="p">
                <b>Rocket</b> {data.name.split('|')[0]}
              </Typography>
              <Typography component="p" rows="1">
                <b>Launch</b> {data.name.split('|')[1]}
              </Typography>
              <Typography component="p">
                <b>Location</b> {data.location.name}
              </Typography>
              <Typography component="p">
                <b>Destination orbit</b> {data.orbit}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <div className={classes.payloadPercentage}>
                {this.renderPayloadPercentage(data)}
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.navigateToLaunchDetails(data.id)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  render() {
    return (
      <Grid container justify="center" spacing={16}>
        {this.createContent()}
      </Grid>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(RecipeReviewCard));
