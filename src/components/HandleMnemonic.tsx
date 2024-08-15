import React, { useState } from "react";
import Generate from "./Generate";
import GenerateWallets from "./GenerateWallets";

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
        <GenerateWallets mnemonic={mnemonic} />
      </div>
    </div>
  );
};

export default HandleMnemonic;
