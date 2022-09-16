import React from "react"



export default function Tenizes(props){
    if(props.tenziesData.every(item => item.value == props.tenziesData[0].value && item.selected == true)){
        props.stopTimer()
    }
    const tenzieElements = props.tenziesData.map(item =>{
        const classString = item.selected ? "tenzie-button selected" : "tenzie-button"
        const iconElement = React.createElement(item.visual,{className:classString},`${item.value}`)
        return(
            <div key={item.id} id={item.id} className="tenzie-div" onClick={e =>props.selectTenzie(e)}>
                {iconElement}
            </div>
        )
    })
    const allTenzieSame = props.tenziesData.every(item => item.selected == true && item.value == props.tenziesData[0].value)
    const bestTime = JSON.parse(localStorage.getItem("bestTime")) || "First Time Playing"
    const bestRoll = JSON.parse(localStorage.getItem("bestRoll")) || "First Time Playing"

    return(
        <div className="tenzies-div">
            <div className="tenzies-text-div">
                <h1 className="tenzies-h1">Dices</h1>
                <p className="tenzies-p">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="tenzies-numbers-div">
                {tenzieElements}
            </div>
            <div className="tenzies-roll-div" onClick={props.rollTenzie}>{allTenzieSame ? "New Game" : "Roll"}</div>
            <div className="info-div">
                <h3>Timer {props.timer}</h3>
                <h3>Roll {props.rollNumber}</h3>
            </div>
            <div className="best-div">
                <h3>Best Time - {bestTime}</h3>
                <h3>Best Roll - {bestRoll}</h3>
            </div>
          
        </div>
    )

}