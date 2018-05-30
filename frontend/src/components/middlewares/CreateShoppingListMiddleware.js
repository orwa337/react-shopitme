import React from 'react';
import CreateShoppingList from '../master-components/CreateShoppingList';
import {Store} from '../../fakeStore';

const CreateShoppingListMiddleware = () => {
    return (
    <Store.Consumer>
      {data =>(<CreateShoppingList updateUserData={data.updateUserData}/>)}
    </Store.Consumer>
    )
}
    
export default CreateShoppingListMiddleware;