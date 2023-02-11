import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/Navbar.css'

const Navbar = () => {

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

  const handlePages = (e) => {
    //console.log(e.target.id);
    const id = e.target.id;


  }

  return  <nav id="menu-h">
            <div className="logo">
              <h3>Pokemon FEDERAL GAME</h3>
            </div>
            <div className="nav-links"> 
              <Link  to="/">Início</Link>
              <Link  to="/About">Sobre</Link>
              <Link  to="/Results">Resultados</Link>
              <Link  to="/SelectedBeast"></Link>
              {currentAccount &&  <input type="button" value={`Carteira: ${walletConnect}`} onClick={DesconnectWalletAction} />}
              {!currentAccount &&  <input type="button" value="Conectar carteira" onClick={connectWalletAction} />} 
            </div>
          </nav>

          
}

export default Navbar;