import React, { useState } from "react";
import { Button } from "./ui/button";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import axios from "axios";

const url =
  "https://solana-devnet.g.alchemy.com/v2/MR15rlO-bHh8MzvXHRHhyiuzF88C-ipZ";

interface GenerateWalletsProps {
  mnemonic: string;
}
interface Wallet {
  publicKey: string;
  privateKey: string;
  showPrivateKey: boolean;
  balance?: number; // Optional field to hold balance
}
const GenerateWallets: React.FC<GenerateWalletsProps> = ({ mnemonic }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

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
  const handleGetBalance = async (
    publicKey: string,
    index: number
  ): Promise<void> => {
    try {
      const response = await axios.post(
        url,
        {
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [publicKey],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Solana returns balance in lamports
      const balanceInLamports = response.data.result.value;
      const balanceInSol = balanceInLamports / 1e9; // Convert from lamports to SOL

      // Log balance to console
      console.log(`Public Key: ${publicKey}`);
      console.log(`Balance: ${balanceInSol} SOL`);

      // Update state with the fetched balance
      const updatedWallets = [...wallets];
      updatedWallets[index].balance = balanceInSol;
      setWallets(updatedWallets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAirdrop = async (
    publicKey: string,
    index: number
  ): Promise<void> => {
    try {
      const response = await axios.post(
        "https://solana-devnet.g.alchemy.com/v2/MR15rlO-bHh8MzvXHRHhyiuzF88C-ipZ",
        {
          jsonrpc: "2.0",
          id: 1,
          method: "requestAirdrop",
          params: [publicKey, 1e9],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Fetch the updated balance after airdrop
      handleGetBalance(publicKey, index);
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
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
            <div className="flex items-center">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleGetBalance(wallet.publicKey, index)}
              >
                Get Balance
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="ml-2"
                onClick={() => handleAirdrop(wallet.publicKey, index)}
              >
                Airdrop SOL
              </Button>
              {wallet.balance !== undefined && (
                <div className="ml-2">Balance: {wallet.balance} SOl</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateWallets;
