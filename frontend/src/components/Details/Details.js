import React, { Component } from 'react';
import { Paper, TextField, Grid, Input, InputLabel, FormControl } from '@material-ui/core';
import fakeStore from '../../fakeStore';


export default class Details extends Component {

  constructor(props){
    super()
    if(localStorage.getItem('userInfo')){
      const userInfoLS = JSON.parse(localStorage.getItem('userInfo'))
      this.state ={
        ...userInfoLS.location,
        deliveringTime: {
          start: props.start,
          end: props.end
        },
        shop: props.shop,
        deliverAdress:{
          street:props.deliverAdress.street,
          number: props.deliverAdress.number,
          postcode: props.deliverAdress.postcode,
          city: props.deliverAdress.city
        }
      }
    } else {
      this.state ={
        ...fakeStore.userInfo.location,
      deliveringTime: {
        start: props.start,
        end: props.end
      },
      shop: props.shop,
      deliverAdress:{
        street:props.deliverAdress.street,
        number: props.deliverAdress.number,
        postcode: props.deliverAdress.postcode,
        city: props.deliverAdress.city
      }
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    let deliveringTime = {
      start: props.start,
      end: props.end
    }
    let shop = props.shop
    let deliverAdress = props.deliverAdress
    return {shop ,deliveringTime ,deliverAdress}
  }

  editing = () =>{
      this.setState(prevState => { return {editing: !prevState.editing}})
  }

  finishEditing = () => {
    this.setState({
      deliverAdress:{
        street: this.state.street,
        number: this.state.number,
        postcode: this.state.postcode,
        city: this.state.city
      }
    },()=>this.props.dataReceive(this.state.deliverAdress,this.state.shop, this.state.orderer))
    this.setState(prevState => { return {editing: !prevState.editing}})
  }
    
  editLocation = name => event => {
    this.setState({[name]: event.target.value},
    ()=>this.props.dataReceive(this.state.deliverAdress, this.state.shop, this.state.orderer));
  }

  handlerChangeStartTime = event => {
    let deliveringTime = this.state.deliveringTime
    deliveringTime.start = event.target.value
    this.setState({deliveringTime});
    this.props.grabDataStartDelivering(event.target.value)
  }

  handlerChangeEndTime = event => {
    let deliveringTime = this.state.deliveringTime
    deliveringTime.end = event.target.value
    this.setState({deliveringTime});
    this.props.grabDataEndDelivering(event.target.value)
  }
    
  render() {
    const styles = {
    }

    let whatToRender = (
      <p className="deliveryAddress">
      <span className="editaddress" onClick={this.editing}>✎</span> 
      <span className="address">Delivery Address</span>
      {this.state.deliverAdress.street}.{this.state.deliverAdress.number}<br/>
      {this.state.deliverAdress.postcode} {this.state.deliverAdress.city} 
      
      </p>          
      )
    if(this.state.editing){
      whatToRender = (
       <p className="deliveryAddress">
         <span className="address">Delivery Address</span>
         <span className="editaddress" onClick={this.finishEditing}>✔</span>
          <FormControl className="todo-list-form">
            <Input autoFocus className="location-input" onChange={this.editLocation('street')} placeholder={this.state.deliverAdress.street} />
            <Input  className="location-input2"  onChange={this.editLocation('number')} placeholder={this.state.deliverAdress.number} />
            <Input  className="location-input3"  onChange={this.editLocation('postcode')} placeholder={this.state.deliverAdress.postcode} />
            <Input  className="location-input4"  onChange={this.editLocation('city')} placeholder={this.state.deliverAdress.city}/>
          </FormControl>
          
        </p>
      )
    }
  
    return (
    <div style={styles.details} className="details">
        <div className="detailsfield-store">
              <FormControl>
                 <InputLabel htmlFor="name-input">Pickup Store / Supermarket:</InputLabel>
                 <Input id="name-input" onChange={this.editLocation('shop')} value={this.state.shop}/>
              </FormControl>
              </div>
        <div className="time-date">
          {whatToRender}    
        <div className="deliveryTimes">
          <p className="address">Delivery Times</p>     
          <div className="detailsfield">
          
          <span>From:</span>
           <TextField
            type="datetime-local"
            onChange={this.handlerChangeStartTime}
            value={this.state.deliveringTime.start}
            InputLabelProps={{
              shrink: true,
            }}
          />
      </div>
      <div className="detailsfield">
        <span>To:</span> 
          <TextField
            onChange={this.handlerChangeEndTime}
            type="datetime-local"
            value={this.state.deliveringTime.end}
            InputLabelProps={{
              shrink: true,
          }}
        />
         </div>
        </div>
        </div>
    </div>
    );
  }
}
