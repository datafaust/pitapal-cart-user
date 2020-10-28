import React, { Component } from 'react';
import Header from "../components/Header";
import MenuItem from '../components/MenuItem';
import classes from './menus.module.css'
import { auth, db } from "../services/firebase";

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            user: auth().currentUser,
            value: 'enter',
            condimentCount: 5,
            showMenu: false,
            menuItems: [
                {
                    "id": 1237,
                    "cart_id": 1791,
                    "item_name": 'chicken with rice',
                    "category_id": 'meal',
                    "cart_description": 'halal chicken served with rice, salad and sauce',
                    "condiments": [{ id: 1, value: "white sauce", isChecked: false },{ id: 2, value: "red sauce", isChecked: false },{ id: 3, value: "green sauce", isChecked: false },{ id: 3, value: "salad", isChecked: false }],
                    "price": 6
                },
                {
                    "id": 1239,
                    "cart_id": 1791,
                    "item_name": 'lamb with rice',
                    "category_id": 'meal',
                    "cart_description": 'halal lamb served with rice, salad and sauce',
                    "condiments": [{ id: 1, value: "white sauce", isChecked: false },{ id: 2, value: "red sauce", isChecked: false },{ id: 3, value: "green sauce", isChecked: false },{ id: 3, value: "salad", isChecked: false }],
                    "price": 6
                }
            ],
            condiments: [
                {
                    "id": 1234,
                    "condiment": "white sauce",
                    "price": 0
                }
            ],
            fruites: [
                { id: 1, value: "white sauce", isChecked: false },
                { id: 2, value: "red sauce", isChecked: false },
                { id: 3, value: "green sauce", isChecked: false },
                { id: 3, value: "salad", isChecked: false }

            ],
            //condiments: false,
            showCondiments: true
            //array:[1,2],

        };
        this.handleCategory = this.handleCategory.bind(this);
    }


    sendMenuItems = () => {
        //console.log(this.state.menuItems);
        
        const output = this.state.menuItems.map(function (obj) {
            return Object.keys(obj).sort().map(function (key) {
                return obj[key];
            });
        });
        console.log(output);
        var body = JSON.stringify(output);
        
        this.state.menuItems.map(item=>{
            //console.log('jsonstring', JSON.stringify(item.condiments))
            fetch(
            `${global.api}/addMenuItem?id=${item.id}&cart_id=${item.cart_id}&item_name=${item.item_name}&category_id=${1}&cart_description=${item.cart_description}&price=${item.price}&active=${1}&condiments=${JSON.stringify(item.condiments)}`,
            { method: "POST" }
            ).catch((error) => {
            console.log(error)
            }) 
        })

        this.setState({ showMenu: false })

    }



    handleAllChecked = (event) => {
        let fruites = this.state.fruites
        fruites.forEach(fruite => fruite.isChecked = event.target.checked)
        this.setState({ fruites: fruites })
    }

    handleCheckChieldElement = (event) => {
        let fruites = this.state.fruites
        fruites.forEach(fruite => {
            if (fruite.value === event.target.value)
                fruite.isChecked = event.target.checked
        })
        this.setState({ fruites: fruites })
    }

    handleCheck = (event, key) => {
        //copy all items
        let menuItems = [...this.state.menuItems];
        //extract the itemn we care about
        let item = { ...menuItems[key] };

        //MAPPING OVER EACH CONDIMENT IN THE COPY TO ASSIGN NEW VALUE
        item.condiments.forEach(condiment => {
            if (condiment.value === event.target.value)
                condiment.isChecked = event.target.checked
        })

        menuItems[key] = item;

        this.setState({ menuItems: menuItems })
        console.log(menuItems);
    }

    handleCategory = (event, key) => {
        console.log('changing meal type', event.target)
        //this.setState({value: event.target.value});

        // 1. Make a shallow copy of the items
        let items = [...this.state.menuItems];
        // 2. Make a shallow copy of the item you want to mutate
        let item = { ...items[key] };
        // 3. Replace the property you're intested in
        item.category_id = event.target.value;
        //4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[key] = item;
        // 5. Set the state to our new copy
        this.setState({ menuItems: items });
    }

    showMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    addMenuItem = () => {
        //let value = this.state.menuItemCount + 1
        //this.setState({ menuItemCount: value });
        let menuItems = [...this.state.menuItems];

        // Add item to it
        menuItems.push({
            "id": 1236,
            "item_name": 'lamb with rice',
            "category_id": 'meal',
            "cart_description": 'halal lamb served with rice, salad and sauce',
            "price": 6
        });

        // Set state
        this.setState({ menuItems });
    }

    getMenus = async () => {
        console.log('retrieving menus...');
        let response = await fetch(`${global.api}/menus`)
        .then(res => res.json())
        .then(res => { 
        console.log('res',res["data"]) 
        return res["data"]
        })
        .catch((error) => {
        console.log(error)
        });
        this.setState({ menuItems: response })
    }



    render() {

        const addCondiment = () => {
            let value = this.state.condimentCount + 1
            this.setState({ condimentCount: value });
        }

        const deleteCondiment = () => {
            let value = this.state.condimentCount - 1
            this.setState({ condimentCount: value });
        }

        const deleteMenuItem = () => {
            let value = this.state.menuItemCount - 1
            this.setState({ menuItemCount: value });
        }

        const hasCondiments = () => {
            this.setState({ condiments: !this.state.condiments })
        }



        let menuItems = null;
        if (this.state.menuItems) {
            menuItems = (
                <div>
                    {
                        this.state.menuItems.map((item, i) => {
                            return <div key={i}>
                                <MenuItem
                                    key={item.id}
                                    item_name={item.item_name}
                                    category_id={item.category_id}
                                    addCondiment={addCondiment}
                                    deleteCondiment={deleteCondiment}
                                    addMenuItem={this.addMenuItem}
                                    deleteMenuItem={deleteMenuItem}
                                    hasCondiments={hasCondiments}
                                    condiments={this.state.condiments}
                                    nestedCondiments = {item.condiments}
                                    showCondiments={this.state.showCondiments}
                                    condimentCount={this.state.condimentCount}
                                    fruites={this.state.fruites}
                                    handleAllChecked={this.handleAllChecked}
                                    handleCheckChieldElement={this.handleCheckChieldElement}
                                    handleCheck = {e => this.handleCheck(e, i)}
                                    handleCategory={e => this.handleCategory(e, i)}
                                />
                            </div>
                        })
                    }
                </div>
            )
        }

        return (

            <div>
                <Header />
                <div className={classes.summary}>
                    <div>Below you will see your listed menus for all carts you have registered in our system. Every cart is allowed one menu at the moment.</div>
                </div>

                <div style={{textAlign:"center", marginTop: '30px'}}>My Existing menus (Flat List below)</div>
                
                <div className={classes.menuList}>
                    <div>Example Menu</div>
                    <div>Cart 1234</div>
                    <button>Edit Menu</button>
                </div>


                <div className={classes.summary}>
                    Click Add a Menu to add a new menu
                </div>
                <div className={classes.buttonContainer}>
                    <button onClick={this.showMenu} className={classes.addButton}>Add a Menu</button>
                </div>
                <div>
                    {this.state.showMenu && 
                        <div className={classes.summary}>
                            Below add all the menu items that belong in your menu. Once you are satified click submit my menu.
                        <div> 
                            {menuItems}
                        </div>
                        <div className={classes.buttonContainer}>
                            <div className={classes.addButton}>
                                <button onClick={this.sendMenuItems}>Submit my Menu</button>
                            </div>    
                        </div>
                        </div>}
                </div>
               

            </div>
        );
    }
}

export default Menu;




/**
 * 
                <div>
                    {menuItems}
                </div>
                <div className={classes.buttonContainer}>
                    <button onClick={() => this.sendMenuItems()
                    }>Submit My Menu</button>
                </div>

 */