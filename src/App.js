 import './App.css'; 
 import { useState, Fragment } from "react";
 import { BrowserRouter  as Router, Routes, Route, Navigate } from "react-router-dom";
 import Navbar from './components/Navbar';
 import SelectedBeast from './components/Selectedbeast'

 //Pages
 import About from './pages/About'
 import Results from './pages/Results'
 import Home from './pages/Home' 

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
   console.log(e);
  setMostrarDiv(e);

}


  return (
    <div className="App">
      <div className='container'>
  
            <Router>
              <Fragment>
                  <Navbar/> 
              </Fragment>
              <Routes> 
                {mostrarDiv && <Route path="/" element={ <Home handleGetId={updateId} /> } /> }
                {!mostrarDiv &&  <Route path="/" element={ <SelectedBeast mostarDiv = {changeMostrarDiv}  retornId={returnId}/>} /> }
                <Route path="/About" element={<About />} />
                <Route path="/Results" element={<Results />} /> 
              </Routes>
            </Router>

      </div>
    </div>
  );
}

export default App;
