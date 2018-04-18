import React, { Component } from 'react';

// import Components
import LandingPage from './LandingPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EditUser from './edit-user/EditUser';
import TodoList from './todo-list/TodoList';
import ShoppingListTitle from './shopping-list-title/ShoppingListTitle';
import Map from './map/Map';
import ImageCropper from './ImageCropper';
import RatingStars from './RatingStars';
import Notes from './Additional-Notes/Notes'




export default class Main extends Component {

state = {
  listId: 3323,
  shopper:{
    name: 'Alice Doe',
    accountPage: 'user323223'
  },
  orderer:{
    name: 'Bob Doe',
    accountPage: 'user324332',
    coords:{
      lat: 52.522955,
      lng: 13.477175,
    },
    deliverAdress:{
      street: 'Sonnenallee',
      number: '154',
      postalCode: '12055',
      city: 'Berlin'
    },
  },
  deliveringTime:{
    start: '14:00',
    end:'16:00'
  },
  items:
  [{
    status:'box',
    todo:"2x Corn Bread"
  },{
    status:'box',
    todo:"Kellogs AllBran"
  },{
    status:'box',
    todo:"4x Milk 3.8% Fet"
  },{
    status:'box',
    todo:"2x Orange Juice low sugar"
  }
  ],
  notes:'Bring me all in a box please. Thank you',
}

  render() {
    return (
      <div className="main">
        {/*<ImageCropper />*/}
        {/*<RatingStars />*/}
        {/*<Map />*/}
        {/*<LandingPage />*/}       
        <ShoppingListTitle checkingPerson={true} shopperName={this.state.shopper.name} shopperAccountPage={this.state.shopper.accountPage} ordererName={this.state.orderer.name} ordererAccountPage={this.state.orderer.accountPage} listName="Shopping List" listId={this.state.listId}/>
        <TodoList orderPerson={true} checkingPerson={false} shopperPerson={false} items={this.state.items}/>
        {/*<EditUser />*/}
        {<Notes />}
      </div>
    )
  }
};