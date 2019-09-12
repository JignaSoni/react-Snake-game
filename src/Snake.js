import React, { Component } from 'react';

class Snake extends Component {
    
    render() { 
        return ( 
            <div>
                {this.props.snakedots.map((dot)=>{
                     const  style={
                        left:`${dot[0]}%`,
                        top:`${dot[1]}%`,
                        
                   }
                  return <div className="snake-dot" style={style}></div>


                }
                   
            
                    )}
           

            </div> 
        );
    }
}
 
export default Snake;