import { update } from 'lodash';
import {useState} from 'react';
import Square from './Square';
var _ = require('lodash');


Array.prototype.inArray = function(comparer) { 
  for(var i=0; i < this.length; i++) { 
      if(comparer(this[i])) return true; 
  }
  return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
  if (!this.inArray(comparer)) {
      this.push(element);
  }
};

function areEqual(a , b) {
  for(let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
}


let finalState = [null, 1, 2, 3, 4, 5, 6, 7, 8];
const lineLength = 3;
const boardLength = 9;

function subNodes(node) {
  let moves = [1, 2, 3, 4] //Up, Left, Down, Right
  let solution = [];
  let index = node.findIndex((element) => element == null );
  for (let i = 1; i <= 4; i++){
    let nodeReturn = node.slice()
    switch(i){
      case 1:
        if (index >= lineLength) {
          let temp = nodeReturn[index - lineLength];
          nodeReturn[index - lineLength] = null;
          nodeReturn[index] = temp;
        }
        break;
      case 2:
        if (index % 3 !== 0) {
          let temp = nodeReturn[index - 1];
          nodeReturn[index - 1] = null;
          nodeReturn[index] = temp;
        }
        break;
      case 3:
        if (index < boardLength - lineLength) {
          let temp = nodeReturn[index + lineLength];
          nodeReturn[index + lineLength] = null;
          nodeReturn[index] = temp;
        }
        break;
      case 4:
        if ( (index + 1) % 3 !== 0) {
          let temp = nodeReturn[index + 1];
          nodeReturn[index + 1] = null;
          nodeReturn[index] = temp;
        }
        break;
      default:
        break;
    }
    if(!areEqual(nodeReturn, node)){
      solution.push(nodeReturn)
    }
  }
  return solution;
}

async function dfs(initialState, updateSquares) {
  let visited = [];
  let queue = []
  queue.push({'state':initialState})
  while(queue.length > 0) {
    let node = queue.shift();
    visited.push(node.toString());
    updateSquares(node.state);
    if (_.isEqual(node.state, finalState)) {
      alert('finished');
      updateSquares(node.state);
      console.log("finished")
      return queue;
    }
    let possiblePaths = subNodes(node.state);
    for (let i = 0; i < possiblePaths.length; i++){
      if ( !visited.includes( possiblePaths[i].toString() )) {
        queue.push({'state': possiblePaths[i]});
        visited.push(possiblePaths[i].toString())
      }
    }
  }
  
  
}


function solve(initialState, updateSquares) {
  dfs(initialState, updateSquares);
  //console.log("finished");
  
  
  
}


function Board(props) {

  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={() => {props.handleSquares(i)}} currentValue={props.currentValue}  />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
  
function Game(props) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentValue, setCurrentValue] = useState(1);

  function handleSqrs(i) {
    if (currentValue > 8 || squares[i]) {
      return;
    }
    const sqrs = squares.slice();
    sqrs[i] = currentValue;
    setSquares(sqrs);
    setCurrentValue(currentValue + 1);
  }
  const instructions = 'Haz click en las casillas para escoger el estado inicial';
  return (
    <div className="game">
      <p>
        {instructions}
      </p>
      <div className="game-board">
        <Board squares={squares} handleSquares={handleSqrs} currentValue={currentValue} />
      </div>
      <div>
      {currentValue > 8 ? <button 
                            className='btn'
                            onClick={ () => {
                              solve(squares, setSquares);
                          }}>Resolver</button> : null}

      </div>
    </div>
  );
}


function App(props){
  return (
    <Game />
  )
}
  
export default App;
