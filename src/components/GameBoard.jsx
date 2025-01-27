// Sets the gameboard with values passed through props from App.jsx
// The board is updated based on the current users button click.

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialBoard;

    // for each turn update the game board at the correct indeces 
    // with the current player symbol
    for (const turn of turns) { 
        const {square, player} = turn;
        const {row, col} = square;
        
        gameBoard[row][col] = player;
    }

    // NOTE: Below code is replaced by above code to derive board state from the props
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
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
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