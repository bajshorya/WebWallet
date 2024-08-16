import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";
import { HDNode } from "@ethersproject/hdnode"; // Correct import path

interface GenerateWalletsProps {
  mnemonic: string;
}

const GenerateEthWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [walletCount, setWalletCount] = useState<string>("");
  const [wallets, setWallets] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWalletCount(event.target.value);
  };

  const handleSubmit = () => {
    const count = parseInt(walletCount, 10);
    if (!isNaN(count)) {
      console.log(`Number of wallets requested: ${count}`);
      generate(count);
    } else {
      alert("Please enter a valid number.");
    }
  };

  const generate = (walletCount: number) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const hdNode = HDNode.fromSeed(seed);

    const newWallets: string[] = [];
    for (let i = 0; i < walletCount; i++) {
      const walletNode = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
      const wallet = new ethers.Wallet(walletNode.privateKey);
      newWallets.push(wallet.address);
      console.log(wallet.address);
    }

    setWallets(newWallets);
  };

  return (
    <div>
      <div>
        <div>
          <h1 className="m-5 text-4xl font-extrabold">Ethereum Wallets </h1>
          <Textarea
            value={walletCount}
            placeholder="Enter number of Wallets"
            onChange={handleChange}
          />
        </div>
        <div className="m-5">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div>
        <div className="m-5 text-4xl font-extrabold">Wallets</div>
        <ul className="m-3">
          {wallets.map((wallet, index) => (
            <li
              key={index}
              className="m-2 border text-slate-100 font-bold bg-slate-500"
            >
              {wallet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenerateEthWallets;
