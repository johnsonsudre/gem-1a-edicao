import { useState } from "react";
import reactLogo from "./assets/react.svg";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://graffitiemmovimento.art" target="_blank">
          <img src={projectLogo} className="logo" alt="GeM Logo" />
        </a>
      </div>
      <h2>Projeto de arte digital com graffiti e realidade aumenta</h2>
      <div className="card">
        <button onClick={() => alert("Inicia RA")}>Entrar</button>
      </div>
      <p className="read-the-docs">Click na logo do projeto para saber mais</p>
    </>
  );
}

export default App;
