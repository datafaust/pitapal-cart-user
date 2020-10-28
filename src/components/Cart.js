
import React from 'react';
import { 
    //Button,
     Card } from 'react-bootstrap'
import classes from './cart.module.css'




const cards = (props) => {

    return (
        <Card className={classes.cards}>
            <a href={props.link}>
                <Card.Img variant="top" src={props.image} style = {{width:50}}/>
                
                <Card.Body className={props.textClass} style = {{color:'black'}}>
                    <Card.Title>{props.cart_name}</Card.Title>
                    <Card.Text>
                        {props.address}
                    </Card.Text>
                    <Card.Text>
                        {props.status == 1 ? 'Open' : 'Close'}
                    </Card.Text>
                </Card.Body>
                <div>
                    <button>Edit Cart Info</button> 
                    <button>Manage Cart Menu</button>
                    <button onClick={props.deleteCart}>Remove Cart</button>

                </div>
                
            </a>
        </Card>
    )
}

export default cards;



/**
<Card.Img variant="top" src={props.image} style = {props.image1}/>
*/