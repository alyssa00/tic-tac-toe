import { useState } from 'react';

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import GameOverModal from './components/GameOverModal.jsx';
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS =  {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD =[
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getActivePlayer(gameTurn) {
  let currentPlayer = 'X';

  // check who the current player is
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function getWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function getGameBoard(gameTurn) { 
  // must create a copy of the initial game board to modify other wise
  // bug is created where restart does not reset board game
  // use the spread operator to create a copy then map each array in the
  // game board to the copied array
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  // for each turn update the game board at the correct indeces 
  // with the current player symbol
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState([]);

  // derive state from a function instead of managing the state like:
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = getActivePlayer(gameTurn);
  const gameBoard = getGameBoard(gameTurn);
  const winner = getWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleRestart() {
    setGameTurn([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

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
          <Player
            initialName={PLAYERS.X}
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onNameChange={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOverModal winner={winner} onRestart={handleRestart} />)}
        <GameBoard
          onSelectSquare={handleSelectPosition}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
