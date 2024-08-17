import React, { useState } from "react";
import { Button } from "./ui/button";
import { mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";
import { HDNode } from "@ethersproject/hdnode";

interface GenerateWalletsProps {
  mnemonic: string;
}

const GenerateEthWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string; showPrivateKey: boolean }[]
  >([]);

  const generateWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const hdNode = HDNode.fromSeed(seed);

    const walletNode = hdNode.derivePath(`m/44'/60'/0'/0/${wallets.length}`);
    const wallet = new ethers.Wallet(walletNode.privateKey);
    setWallets([
      ...wallets,
      {
        publicKey: wallet.address,
        privateKey: wallet.privateKey,
        showPrivateKey: false,
      },
    ]);
  };

  const togglePrivateKeyVisibility = (index: number) => {
    const updatedWallets = [...wallets];
    updatedWallets[index].showPrivateKey =
      !updatedWallets[index].showPrivateKey;
    setWallets(updatedWallets);
  };

  return (
    <div>
      <div className="m-5 text-4xl font-extrabold">Ethereum Wallets</div>
      <Button onClick={generateWallet}>Add Wallet</Button>
      <ul className="m-3">
        {wallets.map((wallet, index) => (
          <li
            key={index}
            className="m-2 border p-2 bg-gray-800 text-white rounded-lg"
          >
            <div>
              <strong>Public Key:</strong> {wallet.publicKey}
            </div>
            <div className="flex items-center">
              <strong className="mr-2">Private Key:</strong>
              <input
                type={wallet.showPrivateKey ? "text" : "password"}
                value={wallet.privateKey}
                readOnly
                className="bg-transparent border-none outline-none w-full"
              />
              <Button
                className="ml-2"
                onClick={() => togglePrivateKeyVisibility(index)}
              >
                {wallet.showPrivateKey ? "Hide" : "Show"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateEthWallets;
