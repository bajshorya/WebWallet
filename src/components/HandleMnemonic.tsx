import React, { useState } from "react";
import Generate from "./Generate";
import GenerateWallets from "./GenerateWallets";
import GenerateEthWallets from "./GenerateEthWallets";

const HandleMnemonic = () => {
  const [mnemonic, setMnemonic] = useState("");
  const handleGenerateMnemonic = (newMnemonic: string) => {
    setMnemonic(newMnemonic);
  };
  return (
    <div>
      <div>
        <Generate
          onGenerateMnemonic={handleGenerateMnemonic}
          mnemonic={mnemonic}
        />
        <div className="m-5 text-4xl font-extrabold">
          How Many Wallets Do You Want?
        </div>
        <div className="flex gap-3 justify-around">
          <GenerateWallets mnemonic={mnemonic} />
          <GenerateEthWallets mnemonic={mnemonic} />
        </div>
      </div>
    </div>
  );
};

export default HandleMnemonic;
