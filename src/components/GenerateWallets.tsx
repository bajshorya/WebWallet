import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

interface GenerateWalletsProps {
  mnemonic: string;
}

const GenerateWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [walletCount, setWalletCount] = useState<string>("");
  const [wallets, setWallets] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

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
    const newWallets: string[] = [];

    for (let i = 0; i < walletCount; i++) {
      const path = `m/44'/501'/${i}'/0'`; // This is the correct derivation path for Solana
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
      const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);

      const publicKey = solanaKeypair.publicKey.toBase58();
      newWallets.push(publicKey);

      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, publicKey]);
      console.log(currentIndex);
      console.log(publicKeys);
    }

    setWallets(newWallets);
  };

  return (
    <div>
      <div>
        <div>
          <h1 className="m-5 text-4xl font-extrabold ">Solana Wallets </h1>
          <Textarea
            value={walletCount}
            placeholder="Enter number of Wallets"
            onChange={handleChange}
          />
        </div>
        <div className="m-5 ">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div>
        <div className="m-5 text-4xl font-extrabold ">Wallets</div>
        <ul className="m-3 ">
          {wallets.map((wallet, index) => (
            <li
              key={index}
              className="m-2 border text-slate-100 font-bold  bg-slate-500"
            >
              {wallet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenerateWallets;
