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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import data from '../../data/launches.json';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
console.log(data[0]);

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
    console.log(data.length);
    for (let i=0; i<data.length; i++){
      launches.push(
        <Grid key={i} item>

        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <Typography variant="caption">
                {data[i].isostart.substr(0,8)}
              </Typography>
            }
            title={data[i].name.split('|')[1]}
            subheader={data[i].location.name}
          />
          <CardMedia
            className={classes.media}
            image={data[i].rocket.imageURL}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              {data[i].missions[0].description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <Button variant="contained" color="primary" className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>)
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