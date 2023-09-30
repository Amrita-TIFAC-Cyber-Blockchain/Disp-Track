import { useState } from 'react'
import '../App.css'
import { ethers } from "ethers";
import DisPTrack_abi from '../contracts/DisPTrack_abi.json';
import { reducerCases } from '../context/Constants';
import { useStateProvider } from '../context/StateContext';

function ConnectWallet() {

  const contractAddress = '0x7494A2F3e17D172a4F54FacBCc0a0769c957D63c';

  const [{},dispatch]=useStateProvider();

  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [connectWallet, setConnectWallet] = useState(false);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  async function connectToMetaMask() {
    if (window.ethereum) {
      try {
        
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account);
        const accountText = account[0].slice(0, 6) +
        '...' +
        account[0].slice(account[0].length - 4, account[0].length);

        setConnectWallet(true)
        setButtonText(accountText);
        updateEthers();

      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask not detected. Please install it.');
    }
  }

  const updateEthers = async() => {
    let tempProvider = new ethers.BrowserProvider(window.ethereum)
    setProvider(tempProvider);

    let tempSigner = await tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, DisPTrack_abi, tempSigner);

    dispatch({ 
      type:reducerCases.SET_CONTRACT,contract:tempContract
    });
    setContract(tempContract);
  }

  return (
    <>
      <button className={connectWallet ? 'nav--connected' : 'nav--connect'} onClick={connectToMetaMask}>
        <img src='connecticon.png' className='nav--connect_icon' />
        {buttonText}
      </button>
    </>
  )
}

export default ConnectWallet;
