 import './App.css'; 
 import { useState, useEffect } from "react";

 //Components
 import BeastsGame from './components/beastsgame';
 import SelectedBeast from './components/selectedbeast';
 import Header from './components/header';

function App() {

  const [resultado, setResultado] = useState(""); 
  const [mostrarDiv, setMostrarDiv] = useState(true); 

const updateId = r => { 
  setResultado(r);
  setMostrarDiv(false)
}


const returnId = () => {
  return resultado;
}

const changeMostrarDiv = (e) => {
   
  setMostrarDiv(e);
  
}


  return (
    <div className="App">
      <div>
        <Header />
        <div className='container'> 
         {mostrarDiv && <BeastsGame handleGetId={updateId} /> }
         {!mostrarDiv && <SelectedBeast mostarDiv = {changeMostrarDiv}  retornId={returnId}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
