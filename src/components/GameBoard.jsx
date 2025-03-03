// Sets the gameboard with values passed through props from App.jsx
// The board is updated based on the current users button click.

export default function GameBoard({ onSelectSquare, board }) {
   
    // NOTE: Below code is replaced by state of the board passed from App.jsx
    // const [gameBoard, setGameBoard] = useState(initialBoard);

    // function handleSelectPosition(rowIndex, colIndex) {
    // setGameBoard((prevBoard) => {
    // // create an immutable copy of the board with the spread operator
    // // add the contents of the nested arrays with .map()
    // const updatedBoard = [...prevBoard.map((innerArrays) => [...innerArrays])]
    // updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    // return updatedBoard;
    // });

    // onSelectSquare();
    // };

    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) =>
                    <li key={colIndex}>
                        {/* 
                            rowIndex and colIndex state get lifted to
                            handleSelectPosition() in App.jsx because the
                            onSelectSquare prop calls handleSelectPosition()
                        
                        */}
                        <button 
                            onClick={() => onSelectSquare(rowIndex, colIndex)}
                            disabled={playerSymbol !== null} // if null button is selectable
                        >
                            {playerSymbol}
                        </button>
                    </li>)}
            </ol>
        </li>)}
    </ol>
};