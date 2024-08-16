import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { generateMnemonic } from "bip39";
interface GenerateProps {
  onGenerateMnemonic: (mnemonic: string) => void;
  mnemonic: string;
}
const Generate: React.FC<GenerateProps> = ({
  onGenerateMnemonic,
  mnemonic,
}) => {
  const handleGenerateMnemonic = async () => {
    const newMnemonic = generateMnemonic();
    onGenerateMnemonic(newMnemonic);
  };
  return (
    <div>
      <div className="m-5 text-4xl font-extrabold ">
        <Button
          variant="destructive"
          size="lg"
          onClick={handleGenerateMnemonic}
        >
          Generate Mnemonic
        </Button>
      </div>
      <Textarea
        value={mnemonic}
        readOnly
        placeholder="Your mnemonic will appear here"
      />
    </div>
  );
};

export default Generate;
