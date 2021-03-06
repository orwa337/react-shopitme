import React, { Component  } from 'react';
import TodoList from '../todo-list/TodoList';

const styles = {
  alignment:{
    position:"relative",
    left:"0"
  }
}

export default class SingleOrderHistory extends Component {

  render() { 
  let orderStatus;
    switch(this.props.order.status)
      {
        case (this.props.order.status = 'Pending'):
          orderStatus = (
            <React.Fragment>
              <p >Published: {this.props.order.created}</p>
              <p>by - </p>
            </React.Fragment>
            )
          break;
        case (this.props.order.status = 'In Progress'):
          orderStatus = (
            <React.Fragment>
              <p>Accepted: {this.props.order.accepted}</p>
              <p>by: {this.props.order.shopper.firstname}</p>
            </React.Fragment>
            )
          break;
        case (this.props.order.status = 'Delivered'):
          orderStatus = (
            <React.Fragment>
              <p>Delivered: at {this.props.order.delivered}</p>
              <p>by {this.props.order.shopper.firstname}</p>
            </React.Fragment>
            )
          break;
          default:
          orderStatus =(<p>No info available</p>);
      }    
    return (
      <div style={styles.alignment}>
          <h1>{this.props.order.shop}</h1>
          {orderStatus}
          <h1>Order #{this.props.order.orderID}</h1>            
      <TodoList
        items={this.props.order.items}  checkingPerson={true}/>
      </div>
    )
  }
};