import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import data from '../../data/launches.json';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Stars';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    objectFit: 'cover',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false,
    spacing: '16',
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  createContent = () => {
    const { classes } = this.props;
    let launches = []
    for (let i=0; i<data.length; i++){
      let payloadSpaceInfo = [];
      let ldate = data[i].net.split(' ');
      if (data[i].payload.freeForOrder > 0) {
        payloadSpaceInfo.push(<StarIcon color='secondary' key={i} />);
      } else {
        payloadSpaceInfo.push(<StarIcon color='action' key={i} />);
      }
      launches.push(
        <Grid key={i} item>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              title={data[i].lsp.name}
              subheader={ldate[0]+' '+ldate[1]+' '+ldate[2]}/>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="150"
              image={data[i].rocket.imageURL}
              title="Contemplative Reptile" 
            />
            <CardContent>
              <Typography component="p">
                <b>Rocket</b> {data[i].name.split('|')[0]}
              </Typography>
              <Typography component="p" rows="1">
                <b>Launch</b> {data[i].name.split('|')[1]}
              </Typography>
              <Typography component="p">
                <b>Location</b> {data[i].location.name}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Typography>
                {data[i].orbit}
              </Typography>
              <Typography>
                {payloadSpaceInfo}
              </Typography>
              <Button variant="contained" color="primary" className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    }
    return launches
  }

  render() {
    const { spacing } = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={8}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {this.createContent()}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);