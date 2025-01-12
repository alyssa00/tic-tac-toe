import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [ playerName, setPlayerName ] = useState(initialName);
    const [ editing, setEditing ] = useState(false);

    function handleNameChange(event){
        setPlayerName(event.target.value);
    }
    
    // dependent on previous state of 'Edit' or 'Save'
    // set the state to the opposite of the previous state when clicking 'Edit' or 'Save'
    function handleEdit() {
        setEditing((edit) => !edit);
    }; 

    let editedPlayerName = <span className="player-name">{playerName}</span>;

    if(editing){ 
        editedPlayerName = <input type="text" required value={playerName} onChange={handleNameChange}/>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editedPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{editing ? 'Save' : 'Edit'}</button>
        </li>
    )
}