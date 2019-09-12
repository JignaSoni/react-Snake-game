import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCordinates=()=>{

  let min=1;
 let max=98;
 let x= Math.floor((Math.random()*(max-min+1)+min)/2)*2;
 let y= Math.floor((Math.random()*(max-min+1)+min)/2)*2;

 return [x,y];
};
const initialState = {
  food : getRandomCordinates(),
  snakeDots : [[0,0],[2,0]],
  speed: 200,
  direction: 'RIGHT',
}

class App extends Component {

  state= initialState;

componentDidMount() {
  setInterval(this.moveSnake,this.state.speed);
  document.onkeydown=this.onkeydown;
}

componentDidUpdate() {
  this.checkIfOutofBorder();
  this.checkIfCollapsed();
  this.checkIfFoodFound();
}
onkeydown=(e)=>{
  e=e || window.event;
  switch(e.keyCode){
    case 37:
    this.setState({direction: 'LEFT'});
    break;
    case 38:
    this.setState({direction: 'UP'});
    break;
    case 39:
    this.setState({direction: 'RIGHT'});
    break;
    case 40:
    this.setState({direction: 'DOWN'});
    break;
  }
}

moveSnake = () =>{
  let snake= [...this.state.snakeDots];
  let head = snake[snake.length-1];

  switch(this.state.direction){
    case 'RIGHT':
        head= [head[0]+2,head[1]];
        break;
    case 'LEFT':
        head= [head[0]-2,head[1]];
        break;
    case 'UP':
        head= [head[0],head[1]-2];
        break;
    case 'DOWN':
        head= [head[0],head[1]+2];
        break;
  }

  snake.push(head);
  snake.shift();
  this.setState({snakeDots: snake });
}

checkIfOutofBorder=()=>{
  let snake= [...this.state.snakeDots];
  let head = snake[snake.length-1];

  if(head[0]>=100 || head[1]>=100 || head[0]<0 || head[1]<0 ){
   this.gameOver();
  }
}

checkIfCollapsed = ()=>{
  let snake= [...this.state.snakeDots];
  let head = snake[snake.length-1];
  snake.pop();
  snake.forEach(body=>{
    if(head[0]==body[0] && head[1]==body[1]){
        this.gameOver();
    }
  })
}

checkIfFoodFound=()=>{
  let snake= [...this.state.snakeDots];
  let head = snake[snake.length-1];
  let food= this.state.food;
  if(head[0]==food[0] && head[1]==food[1]){
    this.setState({ food :  getRandomCordinates() });
    this.enlargeSnake();
    this.increaseSpeed();
  }
}
enlargeSnake=()=>{
  let newSnake= [...this.state.snakeDots];
  newSnake.unshift([]);
  this.setState({ snakeDots: newSnake});
}
increaseSpeed=()=>{
  if(this.state.speed>10){
        this.setState({ speed : this.state.speed - 10});
  }


}



gameOver(){
  alert(` Game Over!! Your score is ${this.state.snakeDots.length} ` );
  this.setState(initialState);

}

  render() { 
    return ( 
      <div className="game-page">
      <Snake snakedots={this.state.snakeDots}/>
      <Food cord={this.state.food}/>
     </div>
     );
  }
}

export default App;