import { useState } from "react";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialBoard);

    function handleSelectPosition(rowIndex, colIndex) {
        setGameBoard((prevBoard) => {
            // create an immutable copy of the board with the spread operator
            // add the contents of the nested arrays with .map()
            const updatedBoard = [...prevBoard.map((innerArrays) => [...innerArrays])]
            updatedBoard[rowIndex][colIndex] = "X";
            return updatedBoard;
        });
};

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) =>
                    <li key={colIndex}>
                        <button onClick={() => handleSelectPosition(rowIndex, colIndex)}>
                            {playerSymbol}
                        </button>
                    </li>)}
            </ol>
        </li>)}
    </ol>
};