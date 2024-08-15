import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Generate from "./components/Generate";
import GenerateWallets from "./components/GenerateWallets";
import HandleMnemonic from "./components/HandleMnemonic";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div>
          <HandleMnemonic />
        </div>
        <div></div>
      </div>
    </>
  );
}

export default App;
