import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { crudAPI } from '../../helpers/helpers';
import './aboutUs.css';


export default class aboutUs extends Component {

  state = {
    ourGHNames:['laithmassoud','NachoMerino','Versioncrowd','tarekcham','orwa337'],
    ourData:[]
  }

  getOurData = () => {
    this.state.ourGHNames.map(name => {return(
      crudAPI('get', `https://api.github.com/users/${name}?client_id=a12b6d5ca6b666061f3a&client_secret=4d8bbe0423b48bf1394b5b4194138302ceadc6f1`)
        .then(data => {
          this.setState(prevState => {return {ourData: [...prevState.ourData, data]}})  
        })
    )})
  }

  componentDidMount(){
    this.getOurData()
  }


  render(){
    return(
      <React.Fragment>
      <h1>Jibli Team:</h1>
        {this.state.ourData.map(developer => (
          <div className='container'>
            <div className='image-container'>
              <img src={developer.avatar_url} alt={developer.name}/>
            </div>
            <h1>{developer.name}</h1>
            <h3>{developer.bio}</h3>
            <div className='contact-container'>
              {developer.html_url ?
                <a href={developer.html_url} target="_blank">
                  <i className='fab fa-github-square'></i>
                </a>: null}
              {developer.email ?
                <a href={`mailto:${developer.email}`}>
                  <i className='fas fa-envelope-open'></i>
                </a>:null}
              {developer.blog ?
                <a href={developer.blog} target="_blank">
                  <i className='fas fa-address-card'></i>
                </a>: null}
            </div>
          </div>
        ))}
      </React.Fragment>   
    )
  }
}
