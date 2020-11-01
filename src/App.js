import {useState, useEffect} from 'react';
import Square from './Square';



function createGraph(initialState) {
  let graph = {};
  //TODO Create graph given initialState
  return graph;
}

function solve(squares) {
  let graph = createGraph(squares);
  //TODO Solve 8 puzzle given states in graph
  console.log("Finished");
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
                              solve(squares);
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
