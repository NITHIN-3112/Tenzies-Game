import React from 'react';
import './App.css';
import Die from "./Die.js";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [newDice,setnewDice] = React.useState(allNewDice())
    const [tenzies,settenzies] = React.useState(false)
    React.useEffect(()=>
    {
        const allHeld = newDice.every(die=>die.isHeld)
        const firstValue = newDice[0].value
        const allSamevalue = newDice.every(die => die.value === firstValue)
        if(allHeld && allSamevalue ){
            settenzies(true)
            
        }
       
    },[newDice])
    function Helper(){
        return {value:Math.ceil(Math.random()*6 ),
        isHeld:false,
        id : nanoid()
        }
    }
    function allNewDice(){
        const NewDIce =[]
        for(let i=0;i<10;i++){
            NewDIce.push(Helper())
        }
        return NewDIce
        
    }
   
    const dieElement = newDice.map(die => <Die 
    key = {die.id} 
    value={die.value} 
    isHeld={die.isHeld}
    holdDice = {()=>holdDice(die.id)}
    
     />)
    function toggle(){
        if(!tenzies){
         setnewDice(old => old.map(die =>{
            return die.isHeld?
            die:
                Helper()
        }))   
        }
        else{
            settenzies(false)
            setnewDice(allNewDice())
        }
    }
     function holdDice(id){
        setnewDice(prev => prev.map(die =>
        {return die.id=== id?{...die,isHeld:!die.isHeld}:die}
        ))        
    }
  return (
    <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
           {dieElement}
        </div>
        <button className="button" onClick={toggle}> {tenzies ? "New Game":"Roll"} </button> 
        </main>
  );
}

export default App;
