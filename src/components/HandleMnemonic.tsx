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
    <div className="flex flex-col items-center p-5">
      <Generate
        onGenerateMnemonic={handleGenerateMnemonic}
        mnemonic={mnemonic}
      />

      <div className="flex gap-5 justify-center mt-10 w-full">
        <GenerateWallets mnemonic={mnemonic} />
        <GenerateEthWallets mnemonic={mnemonic} />
      </div>
    </div>
  );
};

export default HandleMnemonic;
