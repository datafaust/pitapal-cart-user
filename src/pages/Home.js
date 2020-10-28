import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../services/firebase";
import classes from "./home.module.css";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser
    };
  }

  componentDidMount() {
    console.log('user: ',auth().currentUser)
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          You are logged in as: <strong>{this.state.user.email}</strong>
        </div>

        <div className={classes.title}>
          Welcome to the PitaPal Cart Portal. Use the navigation bar above to manage your carts, menus and track incoming orders.
        </div>

        <div className={classes.bodyText}>If you have any feedback or suggestions please email us at email@email.com</div>
        <Footer />
      </div>
    );
  }
}
