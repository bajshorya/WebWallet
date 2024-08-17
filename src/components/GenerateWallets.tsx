import React, { useState } from "react";
import { Button } from "./ui/button";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";

interface GenerateWalletsProps {
  mnemonic: string;
}

interface Wallet {
  publicKey: string;
  privateKey: string;
}

const GenerateWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateWallet = () => {
    if (mnemonic) {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
      const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);

      const newWallet: Wallet = {
        publicKey: solanaKeypair.publicKey.toBase58(),
        privateKey: Buffer.from(solanaKeypair.secretKey).toString("hex"),
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
        Solana Wallets
      </h1>
      <Button onClick={generateWallet} className="mb-5">
        Add Wallet
      </Button>
      <ul>
        {wallets.map((wallet, index) => (
          <li
            key={index}
            className="mb-3 p-3 border rounded-lg bg-gray-700 text-white"
          >
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

export default GenerateWallets;
