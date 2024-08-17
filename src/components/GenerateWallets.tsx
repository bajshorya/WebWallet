import React, { useState } from "react";
import { Button } from "./ui/button";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

interface GenerateWalletsProps {
  mnemonic: string;
}

const GenerateWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string; showPrivateKey: boolean }[]
  >([]);

  const generateWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${wallets.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);

    const publicKey = solanaKeypair.publicKey.toBase58();
    const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");

    setWallets([...wallets, { publicKey, privateKey, showPrivateKey: false }]);
  };

  const togglePrivateKeyVisibility = (index: number) => {
    const updatedWallets = [...wallets];
    updatedWallets[index].showPrivateKey =
      !updatedWallets[index].showPrivateKey;
    setWallets(updatedWallets);
  };

  return (
    <div>
      <div className="m-5 text-4xl font-extrabold">Solana Wallets</div>
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

export default GenerateWallets;
