import React, { Component } from 'react';

class Food extends Component {
   
    render() { 

        const style={
            left:`${this.props.cord[0]}%`,
            top:`${this.props.cord[1]}%`,
            
       }

        return ( <div className="food-dot" style={style}></div> );
    }
}
 
export default Food;