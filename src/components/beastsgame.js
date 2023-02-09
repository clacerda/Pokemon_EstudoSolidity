import React from 'react'
import "./beastgame.css";

const beastsgame = props => {

    const handleChange = (e) => {
        // console.log(e.target.id);
        const id = e.target.id;
         
        props.handleGetId(id);
    
    
    }

  return (
    <div className='beasts'>
            <input type="image" id='1' src={require('../assets/1.jpg')} alt="Pikachu" onClick={handleChange}  />
            <input type="image" id='2' src={require('../assets/2.jpg')} alt="Charizard" onClick={handleChange} />
            <input type="image" id='3'  src={require('../assets/3.jpg')} alt="Blastoise" onClick={handleChange} />
            <input type="image" id='4'  src={require('../assets/4.jpg')} alt="Venosauro" onClick={handleChange} />
            <input type="image" id='5'  src={require('../assets/5.jpg')} alt="Eevee" onClick={handleChange} /> <br />
            <input type="image" id='6'  src={require('../assets/6.jpg')} alt="Mew" onClick={handleChange} />
            <input type="image" id='7'  src={require('../assets/7.jpg')} alt="Mewtwo" onClick={handleChange} />
            <input type="image" id='8'  src={require('../assets/8.jpg')} alt="Arceus" onClick={handleChange} />
            <input type="image" id='9'  src={require('../assets/9.jpg')} alt="Rayquaza" onClick={handleChange} />
            <input type="image" id='10'  src={require('../assets/10.jpg')} alt="Giratina" onClick={handleChange} />  <br />
          </div>
  )
}

export default beastsgame