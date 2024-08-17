import React from "react";
import { Button } from "./ui/button";
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

  const mnemonicWords = mnemonic ? mnemonic.split(" ") : [];

  return (
    <div className="flex flex-col items-center">
      <div className="m-5 text-4xl font-extrabold">
        <Button
          variant="destructive"
          size="lg"
          onClick={handleGenerateMnemonic}
        >
          Generate Mnemonic
        </Button>
      </div>
      {mnemonicWords.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {mnemonicWords.map((word, index) => (
            <div
              key={index}
              className="p-2 bg-gray-800 text-white rounded-lg text-center"
            >
              {word}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generate;
