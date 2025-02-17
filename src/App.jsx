import { useState } from 'react';

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js';

function getActivePlayer(gameTurn){
  let currentPlayer = 'X';

  // check who the current player is
  if( gameTurn.length > 0 && gameTurn[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  
  // derive state from a function instead of managing the state 
  const activePlayer = getActivePlayer(gameTurn);
  // const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectPosition(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurn((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      // create an updated turn based on the current selection and previous turn array
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevTurns
      ]
      return updatedTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectPosition} 
          turns={gameTurn}
        />
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
