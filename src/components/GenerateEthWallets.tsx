import React, { useState } from "react";
import { Button } from "./ui/button";
import { mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";
import { HDNode } from "@ethersproject/hdnode";

interface GenerateWalletsProps {
  mnemonic: string;
}

interface Wallet {
  publicKey: string;
  privateKey: string;
}

const GenerateEthWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateWallet = () => {
    if (mnemonic) {
      const seed = mnemonicToSeedSync(mnemonic);
      const hdNode = HDNode.fromSeed(seed);
      const walletNode = hdNode.derivePath(`m/44'/60'/0'/0/${currentIndex}`);
      const wallet = new ethers.Wallet(walletNode.privateKey);

      const newWallet: Wallet = {
        publicKey: wallet.address,
        privateKey: wallet.privateKey,
      };

      setWallets((prevWallets) => [...prevWallets, newWallet]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("first generate a mnemonic!!!");
    }
  };

  return (
    <div className="w-full max-w-md p-5  rounded-lg">
      <h1 className="text-3xl font-extrabold mb-5 text-white">
        Ethereum Wallets
      </h1>
      <Button onClick={generateWallet} className="mb-5">
        Add Wallet
      </Button>
      <ul>
        {wallets.map((wallet, index) => (
          <li key={index} className="mb-3 p-3 border rounded-lg  text-white">
            <div className="font-bold">Public Key:</div>
            <div className="break-words">{wallet.publicKey}</div>
            <div className="font-bold mt-2">Private Key:</div>
            <div className="break-words">{wallet.privateKey}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateEthWallets;
