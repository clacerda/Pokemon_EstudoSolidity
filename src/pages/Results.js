import { useState, useEffect } from "react";
import { ethers } from "ethers";
import beastgame from '../utils/beastgame.json';
import './Results.css';

function Results (){ 

  const CONTRACT_ADDRESS =  "0xF4b4F05dd6Da1570d8C8ce7C17c000956E52BF8c";
  const [gameContract, setGameContract] = useState(null);
  const [listApostas, setListApostas] = useState(null);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        beastgame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log("Objeto Ethereum não encontrado");
    }
  }, []);

      useEffect(() => {  
        const handleConsultaAposta = async () => {
          try {
     
            const apostas = await gameContract.getAllApostas(1234);
            setListApostas(apostas);
    
            console.log("Apostas: ", listApostas); 
            
            } catch (error) {
              console.log(error);
            } 
        }
        
        handleConsultaAposta();
      },[listApostas])



      



  return (
    <div>
      <h3>Resultados</h3>
      <input type="button" value="consulta" onClick={handleConsultaAposta}  /> 
      <input type="text" name="" id="" placeholder="Pesquisar concurso, ex: 1234"/>
      <hr></hr>
      <h4>Jogos realizados:</h4>
       <table>
          <tbody>
              <tr>
                {/* {!apostas && <td>{apostas}</td>} */}
              </tr>
          </tbody>
       </table>
    </div>
  )
}

export default Results