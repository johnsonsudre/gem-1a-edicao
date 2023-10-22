import "./Cover.css";
import { useNavigate } from "react-router-dom";

// import React from "react";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";

function template() {
  const navigate = useNavigate();
  return (
    <>
      <div className="card">
        <div>
          <a
            className="link-to-about"
            onClick={() => {
              navigate("graffiti");
            }}
          >
            <img src={projectLogo} className="logo" alt="GeM Logo" />
          </a>
        </div>
        <h2>Projeto de arte digital com graffiti e realidade aumenta</h2>
        <button
          id="start"
          onClick={() => {
            navigate("graffiti");
          }}
        >
          Iniciar Graffiti com RA
        </button>
        <p
          className="link-to-about"
          onClick={() => {
            navigate("about");
          }}
        >
          Clique aqui para saber mais!
        </p>
      </div>
    </>
  );
}

export default template;
