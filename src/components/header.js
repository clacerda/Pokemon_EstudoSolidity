import React, { useEffect, useState } from "react";
import "./header.css";

function Header(props) {


    const [currentAccount, setCurrentAccount] = useState('');
    const [walletConnect, setWalletConnect] = useState('');
 
     
    const checkIfWalletIsConnected = async () => {
        try {
          const { ethereum } = window;
     
          const accounts = await ethereum.request({ method: "eth_accounts" });
          const firstWalletTwoCharacters = accounts[0].slice(0, 4); 
          const lastWalletTwoCharacters = accounts[0].slice(-4); 
          const Wallet = firstWalletTwoCharacters + '...' + lastWalletTwoCharacters;
          setWalletConnect(Wallet);
    
        if (accounts.length !== 0) {
              const account = accounts[0];
              console.log("Carteira conectada::", account);
              setCurrentAccount(account);
        } else {
              console.log("Não encontramos uma carteira conectada");
            }
            
        } catch (error) {
          console.log(error);
        }
      };
    
      const connectWalletAction = async () => {
        try {
          const { ethereum } = window;

    
          if (!ethereum) {
            alert("Instale a MetaMask!");
            return;
          }
     
            const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
     
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        checkIfWalletIsConnected();
      }, []);

      const DesconnectWalletAction = async () => {
        await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [] 
      })

      if (typeof window.ethereum !== 'undefined') {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        window.ethereum.on('disconnect', DesconnectWalletAction);
      }
    }

     
    window.ethereum.on('connect', connectWalletAction);
    window.ethereum.on('disconnect', DesconnectWalletAction);

  return (
    <div>
        <nav id="menu-h">
        <div className="logo">
          <h3>Pokemon FEDERAL GAME</h3>
        </div>
        <div className="nav-links">
            <a href="#">Início</a>
            <a href="#">Sobre</a>
            <a href="#">Resultados</a>
            {currentAccount &&  <input type="button" value={`Carteira conectada: ${walletConnect}`} onClick={DesconnectWalletAction} />}
            {!currentAccount &&  <input type="button" value="Conectar carteira" onClick={connectWalletAction} />} 
        </div> 
        </nav>

        <h3>Escolha o bicho:</h3>
    </div>
  )
}

export default Header