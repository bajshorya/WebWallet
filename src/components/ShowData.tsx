import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import axios from "axios";

const ShowData = () => {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  const handleSearch = (value: string) => {
    setPublicKey(value);
    setBalance(null);
  };

  const handleAirdropSolana = async (publicKey: string) => {
    try {
      const response = await axios.post(
        "https://solana-devnet.g.alchemy.com/v2/MR15rlO-bHh8MzvXHRHhyiuzF88C-ipZ",
        {
          jsonrpc: "2.0",
          id: 1,
          method: "requestAirdrop",
          params: [publicKey, 1000000000],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Airdrop successful:", response.data);
      if (response.data.error) {
        console.error("Airdrop error:", response.data.error);
      }
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
  };

  const handleAirdropEth = async (publicKey: string) => {
    try {
      const response = await axios.post(
        "https://eth-sepolia.g.alchemy.com/v2/MR15rlO-bHh8MzvXHRHhyiuzF88C-ipZ",
        {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_sendTransaction",
          params: [
            {
              from: "0xYourFaucetAddress",
              to: publicKey,
              value: "0xde0b6b3a7640000",
              gas: "0x5208",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Airdrop successful:", response.data);
      if (response.data.error) {
        console.error("Airdrop error:", response.data.error);
      }
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
  };

  const handleGetBalanceSolana = async (publicKey: string) => {
    try {
      const response = await axios.post(
        "https://solana-devnet.g.alchemy.com/v2/MR15rlO-bHh8MzvXHRHhyiuzF88C-ipZ",
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
      console.log("Solana balance response:", response.data);
      if (response.data.result && response.data.result.value !== undefined) {
        const balanceInLamports = response.data.result.value;
        const balanceInSol = balanceInLamports / 1e9;
        setBalance(balanceInSol);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleGetBalanceEth = async (publicKey: string) => {
    try {
      const response = await axios.post(
        "https://eth-sepolia.g.alchemy.com/v2/MR15rlO-bHh8MzvXHRHhyiuzF88C-ipZ",
        {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [publicKey, "latest"],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Ethereum balance response:", response.data);
      if (response.data.result !== undefined) {
        const balanceInWei = parseInt(response.data.result, 16);
        const balanceInEth = balanceInWei / 1e18;
        setBalance(balanceInEth);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleSend = () => {
    if (publicKey.startsWith("0x")) {
      handleAirdropEth(publicKey);
    } else {
      handleAirdropSolana(publicKey);
    }
  };

  const handleCheckBalance = () => {
    if (publicKey.startsWith("0x")) {
      handleGetBalanceEth(publicKey);
    } else {
      handleGetBalanceSolana(publicKey);
    }
  };

  return (
    <>
      <div>
        <div className="m-4">
          <h1 className="text-2xl font-bold">
            Wanna perform some actions on a wallet?
          </h1>
          <h3 className="font-thin">
            Enter the public key of that wallet and click the button below it to
            get its balance or to send some tokens to it!
          </h3>
        </div>
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="m-4 flex justify-around">
          <Button variant="secondary" onClick={handleSend}>
            Send
          </Button>
          <Button variant="secondary" onClick={handleCheckBalance}>
            Check Balance
          </Button>
        </div>
        {balance !== null && (
          <div className="m-4 text-slate-100">
            <p>Current Balance: {balance}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowData;
