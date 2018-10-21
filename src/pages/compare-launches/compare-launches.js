import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import data from '../../data/launches.json';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
let date1 = data[0].net.split(' ');
let date2 = data[1].net.split(' ');
let date3 = data[2].net.split(' ');
let date4 = data[3].net.split(' ');

const rows = [
  createData('Launch Date', date1[0]+' '+date1[1]+' '+date1[2], date2[0]+' '+date2[1]+' '+date2[2], date3[0]+' '+date3[1]+' '+date3[2], date4[0]+' '+date4[1]+' '+date4[2]),
  createData('Orbit', data[0].orbit, data[1].orbit, data[2].orbit, data[3].orbit),
  createData('Provider', data[0].lsp.name, data[1].lsp.name, data[2].lsp.name, data[3].lsp.name),
  createData('Location', data[0].location.name, data[1].location.name, data[2].location.name, data[3].location.name),
  createData('Rocket', data[0].rocket.name, data[1].rocket.name, data[2].rocket.name, data[3].rocket.name),
  createData('Total Payload (kg)', data[0].payload.total, data[1].payload.total, data[2].payload.total, data[3].payload.total),
  createData('Free Space', data[0].payload.freeForOrder, data[1].payload.freeForOrder, data[2].payload.freeForOrder, data[3].payload.freeForOrder),
  createData('Payload Price (kg)', '$40k', '$30k', '$50k', '$100k'),  
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Specs</TableCell>
            <TableCell numeric>{data[0].name.split('|')[1]}</TableCell>
            <TableCell numeric>{data[1].name.split('|')[1]}</TableCell>
            <TableCell numeric>{data[2].name.split('|')[1]}</TableCell>
            <TableCell numeric>{data[3].name.split('|')[1]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.calories}</TableCell>
                <TableCell numeric>{row.fat}</TableCell>
                <TableCell numeric>{row.carbs}</TableCell>
                <TableCell numeric>{row.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);