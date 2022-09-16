import React from "react";
import Tenizes from "./Comonents/Tenzies";
import {BsDice1,BsDice2,BsDice3,BsDice4,BsDice5,BsDice6} from "react-icons/bs"


function App() {
  const [tenziesData,setTenziesData] = React.useState([])
  const [timer,setTimer] = React.useState(0)
  const [startTimer,setStartTimer] = React.useState(false)
  const [rollNumber,setRollNumber] = React.useState(0)
  const diceArray = [BsDice1,BsDice2,BsDice3,BsDice4,BsDice5,BsDice6]



  React.useEffect(() => generateTenzies(),[])
  React.useEffect(() =>{
    if(tenziesData.some(item => item.selected == true)){
      console.log("STARTING TIMER")
      setStartTimer(true)
    }
  },[tenziesData.some(item => item.selected == true)])
  React.useEffect(() =>{
    let timerInterval
    if(startTimer){
      timerInterval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000);
    }else if(!startTimer){
      clearInterval(timerInterval)
    }

    return () => clearInterval(timerInterval)
  },[startTimer])

  function generateTenzies(){
    let tenzieArray = []
    for(let i=0;i<10;i++){
      const randomValue = Math.floor(Math.random() * 6 + 1)
      tenzieArray.push(
        {
          value: randomValue,
          visual:diceArray[randomValue-1],
          selected: false,
          id: i
        }
      )
    }
    setTenziesData(tenzieArray)
  }



  function selectTenzie(event){
    const clickedId = event.target.getAttribute("id")
    setTenziesData(prev =>{
      const copyArray = prev.map((item,id) =>{
        return id == clickedId ? {...item,selected:!item.selected} : item
      })

      return copyArray
    })
  }



  function rollTenzie(){
    const allTenzieSame = tenziesData.every(item => item.selected == true && item.value == tenziesData[0].value)

    if(allTenzieSame){
      generateTenzies()
      setRollNumber(0)
      setTimer(0)
      setStartTimer(false)
    }else{
      setTenziesData(prev =>{
        const copyArray = prev.map(item =>{
          if(item.selected){
            return item
          }else{
            const randomValue = Math.floor(Math.random() * 6 + 1)
            return {...item,value:randomValue,visual:diceArray[randomValue-1]}
          }
        })
        return copyArray
      })
      setRollNumber(prev => prev+1)
    }

  }

  function stopTimer(){
    setStartTimer(false)
    if(localStorage.getItem("bestTime")){
      if(JSON.parse(localStorage.getItem("bestTime")) > timer){
        localStorage.setItem("bestTime",JSON.stringify(timer))
      }
    }else{
      localStorage.setItem("bestTime",JSON.stringify(timer))
    }
    if(localStorage.getItem("bestRoll")){
      if(JSON.parse(localStorage.getItem("bestRoll")) > rollNumber){
        localStorage.setItem("bestRoll",JSON.stringify(rollNumber))
      }
    }else{
      localStorage.setItem("bestRoll",JSON.stringify(rollNumber))
    }
  }

  return(
    <div className="container">
        {tenziesData.length != 0 && 
            <Tenizes 
                tenziesData={tenziesData} 
                selectTenzie={selectTenzie} 
                rollTenzie={rollTenzie} 
                rollNumber = {rollNumber}
                timer = {timer}
                stopTimer = {stopTimer}
            />
        }
    </div>
  )
}

export default App;
