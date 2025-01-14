export default function Log({ turns }) { 
    // get information from turns prop to pass to the logger
    return <ol id="log">
        {turns.map((turn) => 
            <li key={`${turn.square.row}${turn.square.col}`}>
                {turn.player} selected {turn.square.row},{turn.square.col}
            </li>
        )}
    </ol>
}