import React, { Component } from 'react';
import TodoList from '../todo-list/TodoList';
import ShoppingListTitle from '../shopping-list-title/ShoppingListTitle';
import Notes from '../Additional-Notes/Notes';
import {Button} from '@material-ui/core'
import Details from '../Details/Details';
import Sure from '../Modals/Sure';
import ConfirmationMessage from '../confirmation-message';
//import fake store
import fakeStore from '../../fakeStore';
import {authCrudAPI, createdate } from '../../helpers/helpers';


export default class CreateShoppingList extends Component {
  constructor(props) {
    super()
    let importData;
    if(localStorage.getItem('userInfo')){
      const userInfoLS = JSON.parse(localStorage.getItem('userInfo'))
      importData ={...userInfoLS}
    } else {
      importData ={...fakeStore.userInfo}
    }

    this.state = {
      userInfo: importData,
      openSureModal:false,
      openConfirmationMessage: false,
      dataToConfirmationMessage:'',
      order: {
        deliveringTime: {
          start: '',
          end: ''
        },
        items: fakeStore.items,
        shop: '',
        notes: '',
        createdate: createdate,
        ordername: 'Order Name',
        orderID: 'xxx',
        orderer:{
          location:{
            street:importData.location.street,
            number: importData.location.number,
            postcode: importData.location.postcode,
            city: importData.location.city
          }
        }
      }
    }
  }

  UNSAFE_componentWillMount(props, state) {
    if(this.props.editOrder) {
      let order = {...this.state.order}
      order.ordername = this.props.editOrder.ordername
      order.orderID = this.props.editOrder.orderID
      order.createdate = this.props.editOrder.createdate
      console.log(order)
      this.setState({
        order
      })
    }
  }
  
  cancelDeleteHandler = () => {
    console.log(this.props.editing)
    if(this.props.editing) {
      const id = this.props.editOrder._id;
      authCrudAPI('DELETE', '/user/deleteshoppinglist/' + id)
      .then(data => {
        if(!data.error){
          // if OK let a confirmation message popup
          this.openConfirmationMessage(data.message)
          // If successfull send data to the Store
          // this.props.updateOrderData(this.state.order);
        } else {
          this.openConfirmationMessage(data.error)
        }
      })
    } else {
      this.setState(prevState => {
        return {
          openSureModal: !prevState.openSureModal
        }
      });
    } 
  }

  sendback = () => {
    this.setState({openSureModal: false})
  }

  grabDataShoppingListTitle = (ordername) => {
    this.setState({
      order:{...this.state.order,
       ordername}
    });
  }

  grabDataDoList = items => {
    this.setState({
      order: {
        ...this.state.order,
        items
      }
    });
  }

  grabDataDetails = (details, shop) => {
    this.setState({
      order: {
        ...this.state.order,
        shop,
        orderer: {
          location: {
            street: details.street,
            number: details.number,
            postcode: details.postcode,
            city: details.city
          }
        }
      }
    })
  }

  grabDataNotes = notes => {
    this.setState({
      order: {
        ...this.state.order,
        notes
      }
    });
  }

  grabDataStartDelivering = startTime => {
    let order = {
      ...this.state.order
    }
    order.deliveringTime.start = startTime
    this.setState({
      order: {
        ...order
      }
    });
  }

  grabDataEndDelivering = endTime => {
    let order = {
      ...this.state.order
    }
    order.deliveringTime.end = endTime
    this.setState({
      order: {
        ...order
      }
    });
  }

  sendDataToServer = () => {
    // if this props is editing - select corresponding API Call
    if(this.props.editing) {
      // 1. Collect the Data of the Order and send it to the Store
      // this.props.updateOrderData(this.state.order);
      // 2. Send the Data to the Database
      const id = this.props.editOrder._id;
      const newOrder = this.state.order;
      authCrudAPI('PUT', '/user/updateshoppinglist/' + id, newOrder)
      .then(data => {
        if(!data.error){
          // if OK let a confirmation message popup
          this.openConfirmationMessage(data.message);
          // If successfull send data to the Store
          //this.props.updateOrderData(this.state.order);
        } else {
          this.openConfirmationMessage(data.error)
        }
      })
    } else {
    
      // 1. Send the Data to the Database
      // this.props.updateOrderData(this.state.order);

      authCrudAPI('POST','/user/createshoppinglist', this.state.order)
        .then(data => {
          if(!data.error){
            // if OK let a confirmation message popup
            this.openConfirmationMessage(data.message)
            // If successfull send data to the Store
          } else {
            this.openConfirmationMessage(data.error)
          }
        })
      .catch(error => console.log(error));
    } 
  }

  openConfirmationMessage = dataToConfirmationMessage => {
    this.setState({openConfirmationMessage:true, dataToConfirmationMessage})
  }

  closeConfirmationMessage  = () => {
    this.setState({openConfirmationMessage:false, dataToConfirmationMessage:''},window.history.back())
  }

  render() {
    const style = {
      margin: '1rem 0.5rem 0 0.5rem'
    }

    return (
      <div className="createShoppingList main">
        <ShoppingListTitle
          dataReceive={this.grabDataShoppingListTitle}
          listName={this.state.order.ordername}
          listId={this.state.order.orderID}
          createdate={this.state.order.createdate}
          checkingPerson={false}
        />
        <TodoList
          dataReceive={this.grabDataDoList}
          orderPerson={true}
          items={this.props.editing
          ? this.props.editOrder.items
          : this.state.order.items}/>
        <Details
          grabDataStartDelivering={this.grabDataStartDelivering}
          grabDataEndDelivering={this.grabDataEndDelivering}
          dataReceive={this.grabDataDetails}
          start={this.props.editing
          ? this.props.editOrder.deliveringTime.start
          : ''}
          end={this.props.editing
          ? this.props.editOrder.deliveringTime.end
          : ''}
          shop={this.props.editing
          ? this.props.editOrder.shop
          : this.state.shop}
          deliverAdress={this.props.editing
          ? {
            ...this.props.editOrder.deliverAdress
          }
          : {
            ...this.state.deliverAdress
          }}/>
        <Notes
          dataReceive={this.grabDataNotes}
          noteText={this.props.editing
          ? this.props.editOrder.notes
          : ''}/>
        <Button
          style={style}
          variant="raised"
          color="secondary"
          onClick={this.cancelDeleteHandler}
        >
        {this.props.editing ? 'Delete' : 'Cancel'}
        </Button>

        <Button onClick={this.sendDataToServer} style={style} variant="raised" color="primary">
          {this.props.editing ? 'Update' : 'Create'}
        </Button>
        <Sure sendback={this.sendback} open={this.state.openSureModal}/>
        <ConfirmationMessage
          openConfirmationMessage={this.state.openConfirmationMessage}
          dataToConfirmationMessage={this.state.dataToConfirmationMessage}
          closeConfirmationMessage={this.closeConfirmationMessage}
        />
      </div>
    )
  }
};