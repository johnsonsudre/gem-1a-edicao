import "./Cover.css";
import { useNavigate } from "react-router-dom";

// import React from "react";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";

function template() {
  window.location.reload();
  const navigate = useNavigate();
  return (
    <>
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
      <div className="card">
        <button
          id="start"
          onClick={() => {
            navigate("graffiti");
          }}
        >
          Iniciar Graffiti com RA
        </button>
      </div>
      <p
        className="link-to-about"
        onClick={() => {
          navigate("about");
        }}
      >
        Clique aqui para saber mais!
      </p>
    </>
  );
}

export default template;
