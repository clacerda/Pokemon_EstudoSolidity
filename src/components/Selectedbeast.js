 import { useState, useEffect } from "react";
 import { ethers } from "ethers";
 import "./Selectedbeast.css";
 import beastgame from '../utils/beastgame.json';
 
function SelectedBeast (props) {

  const [gameContract, setGameContract] = useState(null);
    
  const CONTRACT_ADDRESS =  "0xF4b4F05dd6Da1570d8C8ce7C17c000956E52BF8c";
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

   
    const idBestSelected =  props.retornId(); 
  
    const handleChangeDiv = () => {
        props.mostarDiv(true);
    }

    
    const handleAposta = async () => {
      try {

        const { ethereum } = window;

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });


        console.log(accounts[0]);   

        const txn = await gameContract.setPlay(accounts[0], idBestSelected);
        await txn.wait();
        
        console.log(txn);

      } catch (error) {
        console.log(error);
      }

    }
    
  return (
    <div id="body-beast">
        <h1>Certeza que deseja apostar no:</h1>
        <input type="image" id={idBestSelected} src={require(`../assets/${idBestSelected}.jpg`)} alt="Pokemon escolhido." />
       
        <input type="button" value="Apostar" onClick={handleAposta}  /> 
        <input type="button" value="Voltar" onClick={handleChangeDiv} /> 
    </div>

    
  )
}

export default SelectedBeast