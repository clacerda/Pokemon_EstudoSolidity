 import { useState, useEffect } from "react";
 import { ethers } from "ethers";
 import "./Selectedbeast.css";
 import beastgame from '../utils/beastgame.json';

function SelectedBeast (props) {
   
    const idBestSelected =  props.retornId(); 

    const CONTRACT_ADDRESS = "0x55cB6cc20246da6e18220182e62d7Bd6542e83Dc"
    const [gameContract, setGameContract] = useState(null);
    const handleChangeDiv = () => {
        props.mostarDiv(true);
    }
    // const checkNetwork = async () => {
    //   try {
    //     if (window.ethereum.networkVersion !== "5") {
    //       alert("Please connect to Goerli!");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };


    
    const handleAposta = async () => {
      try {

        const { ethereum } = window;

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });


        console.log(accounts[0]);   

        const txn = await gameContract.setPlay(accounts[0], idBestSelected  );
        await txn.wait();
        
        console.log(txn);

      } catch (error) {
        console.log(error);
      }

    }
 
    // const retAposta = (aposta) => {
    //   return {
    //     apostador: aposta.apostador,
    //     number: aposta.number,
    //     concursoAposta: aposta.concursoAposta
    //   }
    // }

    const handleConsultaAposta = async () => {
      try {


        const apostasTxn = await gameContract.getAllPlay();
        console.log("Apostas: ", apostasTxn); 

      } catch (error) {
        console.log(error);
      }

    }

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
  
 
    
  return (
    <div id="body-beast">
        <h1>Certeza que deseja apostar no:</h1>
        <input type="image" id='1' src={require(`../assets/${idBestSelected}.jpg`)} alt="Pokemon escolhido." />
       
        <input type="button" value="Apostar" onClick={handleAposta}  />
        <input type="button" value="consulta" onClick={handleConsultaAposta}  />
        <input type="button" value="Voltar" onClick={handleChangeDiv} /> 
    </div>

    
  )
}

export default SelectedBeast