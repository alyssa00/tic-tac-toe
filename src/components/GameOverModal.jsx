export default function GameOverModal({winner, onRestart}) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} won!!</p>}
            {!winner && <p>Scratch Game! </p>}
            <button onClick={onRestart}>Rematch</button>
        </div>
    )
}