import React from 'react';
import {Paper, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './index.css';

const styles = theme => ({
  p: {
    display: 'inline-block',
    padding: '0 7px 0 0',
    margin: '5px 0'
  },
  button:{
    margin: '0',
    padding: '0',
  },
  buttonDiv: {
    width: '18%',
    display: 'inline-block'
  },
  textDiv: {
    width: '70%',
    display: 'inline-block'
  }
});

const orderHistory = props => {
  const {classes} = props;
  let shopper = (
    <p className={classes.p}>By: -
    </p>
  )
  if (props.orderHistory.shopper) {
    shopper = (
      <p className={classes.p}>By: <a onClick={props.openUserProf}> {props.orderHistory.shopper.firstname}</a></p>
    )
  }

  let deliverDate;
  switch (props.orderHistory.status) {
    default:
    case('Pending'):
      deliverDate = (
        <p className={classes.p}>Published: {props.orderHistory.createdate}</p>
      )
      break;
    case('In Progress'):
      deliverDate = (
        <p className={classes.p}>Accepted: {props.orderHistory.accepted}</p>
      )
      break;
     case ('Delivered'):
      deliverDate = (
        <p className={classes.p}>Delivered: {props.orderHistory.delivered}</p>
      )
      break;
  }

  return (
    <div>
      <Paper className="paper" elevation={4}>
        <div className={classes.textDiv}>
          {/*<p>orderID: {props.orderHistory.orderID}</p>*/}
          <p className={classes.p}>{props.orderHistory.status}</p>
          <p className={classes.p}>{props.orderHistory.ordername}</p>
          {shopper}
          {/*<p>created: {props.orderHistory.created}</p>*/}
          {deliverDate}
          {/*<p>delivered time: {props.orderHistory.delivered.time}</p>*/}
        </div>
        <div className={classes.buttonDiv}>
          <Button
            className={classes.button}
            variant="fab"
            aria-label="add"
            onClick={props.orderMoreInfo}>
            <i class="material-icons">keyboard_arrow_right</i>
          </Button>
        </div>
      </Paper>
    </div>
  );
}

orderHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(orderHistory);
