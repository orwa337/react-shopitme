import React, { Component } from 'react';
import {TextField, Grid }from '@material-ui/core';

// Define the Gender Options here!!
const genders = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Other', label: 'Other' },
    { value: 'Rather Not Say', label: 'Rather Not Say' },
  ];

export default class UserDetailsForm extends Component {

  state = {}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }
  
  render() {
    let userInfoLSParsed;
    const userInfoLS = localStorage.getItem('userInfo')
    if(userInfoLS){
      userInfoLSParsed = JSON.parse(userInfoLS);
    };
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <TextField
            id='firstname'
            label='Firstname'
            placeholder='Firstname'
            onChange={this.props.handleChange('firstname')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.firstname : null }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='lastname'
            label='Laststname'
            placeholder='Laststname'
            onChange={this.props.handleChange('lastname')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.lastname : null }
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id='street'
            label='Street'
            placeholder='Street'
            onChange={this.props.handleChange('street')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.location.street : null }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='number'
            label='Number'
            placeholder='Number'
            onChange={this.props.handleChange('number')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.location.number : null }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='postcode'
            label='Postcode'
            placeholder='Postcode'
            onChange={this.props.handleChange('postcode')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.location.postcode : null }
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id='city'
            label='City'
            placeholder='City'
            onChange={this.props.handleChange('city')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.location.city : null }
          />
        </Grid>
        {/* <Grid item xs={12}>
            <TextField
                    id='country'
                    label='Country'
                    placeholder='Country'
                    onChange={this.props.handleChange('country')}
                    margin="normal"
                    required
                    fullWidth
                    value={this.props.userdetails.deliverAdress.country}
            />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            id='email'
            label='Email'
            placeholder='Email Address'
            onChange={this.props.handleChange('email')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.email : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='mobile'
            label='Mobile'
            placeholder='Mobile'
            onChange={this.props.handleChange('mobile')}
            margin="normal"
            required
            fullWidth
            value={userInfoLSParsed ? userInfoLSParsed.mobile : null }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="gender"
            select
            label="Gender"
            onChange={this.props.handleChange('gender')}
            value={userInfoLSParsed ? userInfoLSParsed.gender : null }
            SelectProps={{
                native: true,
                }}
            helperText="Please select your gender"
            margin="normal"
            fullWidth
          >
          {genders.map(gender => (
            <option key={gender.value} value={gender.value}>{gender.label}</option>
          )
          )}
          </TextField>
        </Grid>
      </React.Fragment>
    );
  }
}
