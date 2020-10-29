import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import classes from './signup.module.css';
import LandingHeader from '../components/LandingHeader';
import bg from '../assets/halalbg.jpg'
import Land from './Land';

const moment = require("moment");

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: '',
      city_id: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password)
        .then(res => {
          //console.log('hello:',res.user.uid)
          this.addCustomer(res.user.uid);
        })
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  addCustomer = (uid) => {
    console.log('signing up with...',
      this.state.fname, this.state.lname, this.state.phone,this.state.email,this.state.city_id)
    let sqlStamp = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + '0';

    fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `${global.api}/addCustomer?id=${uid}&customer_name=${this.state.fname + ' ' + this.state.lname}&city_id=${this.state.city_id}&phone=${this.state.phone}&email=${this.state.email}&time_joined=${sqlStamp}`,
      { method: "POST" }
    ).catch((error) => {
      console.log(error)
    })

  }

  handleCity = (event) => {
    console.log('city', this.state.city_id);
    this.setState({ city_id: event.target.value });
  }

  render() {
    console.log(this.state.fname, this.state.lname, this.state.city_id, this.state.phone)
    return (
      <div className={classes.body}>
        

        {/**BELOW IS THE SIGN UP CONTAINER FORM */}
        <div className={classes.signupContainer}>

          <p className={classes.pitch}>Joining our network is 100% free. Get 10% of our service fee to customers on every sale.</p>
          <form className="px-5" autoComplete="off" onSubmit={this.handleSubmit}>
            <p className="lead">Fill in the form below to create an account.</p>
            <div className="form-group">
              <form>
                <label>
                  What city is the cart in?
          <select className="form-control" value={this.state.city_id} onChange={this.handleCity}>
                    <option value="1">New York City</option>
                    <option value="2">Philadelphia</option>
                    <option value="3">Boston</option>
                  </select>
                </label>
              </form>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="First Name" name="fname" type="name" onChange={this.handleChange} value={this.state.fname}></input>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Last Name" name="lname" type="name" onChange={this.handleChange} value={this.state.lname}></input>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Phone" name="phone" type="phone" onChange={this.handleChange} value={this.state.phone}></input>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
            </div>

            <p className={classes.disclaimer}>By clicking “Signup,” you agree to PitaPal General Terms and Conditions and acknowledge you have read the Privacy Policy.</p>

            <div className="form-group">
              {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
              <button className={classes.signup}>Sign up</button>
            </div>
            <hr></hr>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>

        <div className={classes.header}>
                <div className={classes.headerTitle}>
                    PitaPal
                </div>
        </div>


        <div className={classes.introBox}>

            <p className={classes.title}>
              Partner with PitaPal and start accepting online orders for pickup!
            </p>
      
            <p className={classes.summary}>
              PitaPal is a technology platform helping cart businesses offer takeout meals for online purchase. Join our network of carts online and boost your bottom line.
            </p>
  
        </div>







      </div>
    )
  }
}

//btn btn-primary rounded-pill px-5