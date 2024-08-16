import { useState } from "react";
import "./App.css";
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
