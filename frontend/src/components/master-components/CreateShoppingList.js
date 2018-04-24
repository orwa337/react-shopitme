import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TodoList from '../todo-list/TodoList';
import ShoppingListTitle from '../shopping-list-title/ShoppingListTitle';
import Notes from '../Additional-Notes/Notes';
import Button from 'material-ui/Button';
import Details from '../Details/Details';
import Sure from '../Modals/Sure';
//import fake store
import fakeStore from '../../fakeStore';

export default class CreateShoppingList extends Component {

    state = {...fakeStore}
    

    
      render() {
        return (
          <div className="createShoppingList main">
            <ShoppingListTitle listId={this.state.listId} checkingPerson={false} />
            <TodoList orderPerson={true}  items={this.state.items}/>
            <Details />
            <Notes />
      <Button  variant="raised" color="secondary" onClick={(e) => this.sure.setState({open: true})}>
        Delete
      </Button>
      <Button  variant="raised" color="primary">
        Send
      </Button>
      <Sure ref={(ref) => this.sure = ref} open={this.state.open}/>
    </div>
        )
      }
    };