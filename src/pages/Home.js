import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../services/firebase";
import { Link } from 'react-router-dom';
import "./home.css";

//IMAGES FOR SIDE BY SIDE
import cart from '../assets/street-food.png';
import menu from '../assets/menu.png';
import serve from '../assets/food-tray.png';

//IMAGES FOR CAROUSEL
import carousel1 from '../assets/cart-carousel1.jpg';
import carousel2 from '../assets/cart-carousel2.jpg';
import carousel3 from '../assets/cart-carousel3.jpg';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser
    };
  }

  componentDidMount() {
    console.log('user: ', auth().currentUser)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="float-md-right">
            You are logged in as: <strong>{this.state.user.email}</strong>
          </div>
          <br />

          {/*CAROUSEL*/}
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={carousel1} alt="First slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={carousel2} alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={carousel3} alt="Third slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <br/>



          {/*HOW DO I GET STARTED*/}

          <div className="row">
            <h5 className="mx-auto text-center"><u>How do I get Started?</u></h5>
          </div>
          <div className="py-1">
            <p>
              Joining our PitaPal network is a way to boost your food sales by offering online order for takeout. Now that you have made an account with us, simply add your carts, corresponding menus and start taking orders right away. Below we offer an introductory video on the process. We are always available to help our partners get their operations running so if you have any questions contact us at the contact page.
            </p>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <Link  to="/carts">
                <img src={cart} class="img-fluid mx-auto d-block" alt="Responsive image" />
              </Link>
              <p className="text-center">Enter information on your halal cart and add them to our network.</p>
            </div>
            <div class="col">
              <Link  to="/menus">
                <img src={menu} class="img-fluid mx-auto d-block" alt="Responsive image" />
              </Link>
              <p className="text-center">Create and upload your online menu.</p>
            </div>
            <div class="col">
              <Link  to="/orders">
                <img src={serve} class="img-fluid mx-auto d-block" alt="Responsive image" />
              </Link>
              <p className="text-center">Start receiving orders and prepping for takeout.</p>
            </div>
          </div>

          {/*WATCH A VIDEO*/}
          <br />
          <div className="mx-auto sizer">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
            </div>
          </div>



        </div>



        <Footer />
      </div>
    );
  }
}
