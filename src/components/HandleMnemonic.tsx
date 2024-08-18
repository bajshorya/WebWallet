import React, { useState } from "react";
import Generate from "./Generate";
import GenerateWallets from "./GenerateWallets";
import GenerateEthWallets from "./GenerateEthWallets";
import { Button } from "./ui/button";
import ShowData from "./ShowData";

const HandleMnemonic = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<
    "solana" | "ethereum" | ""
  >("");

  const handleGenerateMnemonic = (newMnemonic: string) => {
    setMnemonic(newMnemonic);
  };

  const handleSelectWallet = (walletType: "solana" | "ethereum") => {
    setSelectedWallet(walletType);
  };

  return (
    <div className="flex justify-between">
      {" "}
      {/* Ensuring proper spacing */}
      <div className="w-1/2">
        {" "}
        {/* Left half of the screen */}
        <Generate
          onGenerateMnemonic={handleGenerateMnemonic}
          mnemonic={mnemonic}
        />
        <div className="flex gap-3 justify-center m-5">
          <Button
            variant={selectedWallet === "solana" ? "default" : "secondary"}
            onClick={() => handleSelectWallet("solana")}
            className={selectedWallet === "solana" ? "border " : ""}
          >
            Solana
          </Button>
          <Button
            variant={selectedWallet === "ethereum" ? "default" : "secondary"}
            onClick={() => handleSelectWallet("ethereum")}
            className={selectedWallet === "ethereum" ? "border " : ""}
          >
            Ethereum
          </Button>
        </div>
        <div className="flex gap-3 justify-center">
          {selectedWallet === "solana" && (
            <GenerateWallets mnemonic={mnemonic} />
          )}
          {selectedWallet === "ethereum" && (
            <GenerateEthWallets mnemonic={mnemonic} />
          )}
        </div>
      </div>
      <div className="w-1/2">
        <ShowData />
      </div>
    </div>
  );
};

export default HandleMnemonic;
