import React, { Component } from 'react';
import Header from "../components/Header";
import Cart from '../components/Cart';
import cartIcon from '../assets/food-cart.png';
import CartModal from '../components/CartModal';
import MapModal from '../components/MapModal';
import classes from './carts.module.css';
import { isObjectBindingPattern, convertCompilerOptionsFromJson, collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Button } from 'react-bootstrap';
import { auth, db } from "../services/firebase";

class Carts extends Component {

    constructor() {
        super();
        this.state = {
            carts: '',
            showModal: false,
            showMap: false,
            cart_name: '',
            lat:'43.0000',
            lon:'-73.0000',
            cart_address:'',
            zip_code: '',
            active:'1',
            city_id:1,
            cartAdded:0
        };
        this.handleChange = this.handleChange.bind(this);
        //this.deleteCart = this.deleteCart.bind(this);
    }

    componentDidMount(){
        console.log(this.state.cartAdded)
        this.getCarts()
    }

    async componentDidUpdate(prevProps,prevState) {
        if(this.state.cartAdded !== prevState.cartAdded) {
            console.log(prevState.cartAdded,'?',this.state.cartAdded);
            console.log('cart was added********')
            await this.getCarts();
        }
    }

    //CHECK LOCATION
    checkLocation = async () => {
        this.setState({ showMap: !this.state.showMap, showModal: false });
    }

    //RE-ENTER ADDRESS
    retryAdd = () => {
        this.setState({ showMap: false, showModal: true})
    }

    //ADD CART
    addCart = async () => {
        this.setState({ showModal: !this.state.showModal });
        console.log('adding cart'); 
    }

    //FINAL SUBMIT
    submitCart = async () => {
        this.setState({ showModal: false, showMap: false, cartAdded: this.state.cartAdded + 1 })
        console.log('submitting cart to database....')

        let id = auth().currentUser.uid + '1' //+ this.state.cart_name.replace(/ /g, '');

        fetch(
            `${global.api}/addCart?id=${id}&customer_id=${auth().currentUser.uid}&cart_name=${this.state.cart_name}&lat=${this.state.lat}&lon=${this.state.lon}&cart_address=${this.state.cart_address}&active=${this.state.active}&city_id=${this.state.city_id}`,
            { method: "POST" }
        ).catch((error) => {
            console.log(error)
        })
    }

    //DELETE CART
    deleteCart = async () => {
        console.log('cart is removed...')
        let id = auth().currentUser.uid + '1'//+ this.state.cart_name.replace(/ /g, '');
        await fetch(
            `${global.api}/deleteCart?id=${id}`,
            { method: "DELETE" }
          ).catch((error) => {
            console.log(error)
          })

          this.setState({ cartAdded: this.state.cartAdded - 1 })
          
    }


    //FETCH CARTS
    getCarts = async () => {
    let response = await fetch(`${global.api}/carts`)
    .then(res => res.json())
    .then(res => { 
      console.log('res',res["data"]) 
      return res["data"]
    })
    .catch((error) => {
      console.log(error)
    });
    this.setState({ carts: response })

    }

    //HANDLE INPUT CHANGE
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    render() {
        console.log('modal? ', this.state.showModal);
        console.log('showmap? ', this.state.showMap);
        console.log('cart name: ', this.state.cart_name);
        console.log('user in carts: ', auth().currentUser.uid)
        let carts = null;
        if (this.state.carts) {
            carts = (
                <div>
                    {
                        this.state.carts.map((cart, i) => {
                            return <div key={i}>
                                <Cart
                                    key={cart.id}
                                    image={cartIcon}
                                    cart_name={cart.cart_name}
                                    address={cart.address}
                                    status = {cart.status}
                                    deleteCart={this.deleteCart}
                                />
                            </div>
                        })
                    }
                </div>
            )
        }

        let modal = null;
        if(this.state.showModal == false & this.state.showMap == false ) {
            modal = (<div></div>)
        } else if(this.state.showModal == true & this.state.showMap == false) {
            modal = ( <CartModal 
                        addCart={this.addCart}
                        checkLocation={this.checkLocation}
                        cart_name = {this.state.cart_name}
                        cart_address={this.state.cart_address}
                        handleChange={this.handleChange}
                      />) 
        } else if(this.state.showModal == false & this.state.showMap == true) {
            modal = ( <MapModal 
                        addCart={this.addCart}
                        checkLocation={this.checkLocation}
                        retryAdd={this.retryAdd}
                        submitCart={this.submitCart}
                    />) 
        }

        return (
            <div>
                <Header />
                <div className={classes.title}>
                    Use the options below to add, edit, remove or change the status of your carts.
                </div>
                <div className={classes.addContainer}>
                    <button onClick={this.addCart}>Add Cart</button>
                </div>
               {modal}
               <div>
                   {this.state.carts && carts}
               </div>
            </div>
        );
    }
}


export default Carts;