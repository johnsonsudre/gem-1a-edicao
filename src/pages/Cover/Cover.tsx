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
            // className="link-to-about"
            onClick={() => {
              navigate("graffiti");
            }}
          >
            <img src={projectLogo} className="logo" alt="GeM Logo" />
          </a>
        </div>
        <p style={{ marginTop: "-1rem", fontSize: "1.35rem" }}>
          Projeto de arte digital
        </p>
        <p
          style={{
            marginTop: "-1.5rem",
            fontSize: "1rem",
            // fontStyle: "italic",
          }}
        >
          Fase 1: <b>g</b>raffiti & <b>r</b>ealidade <b>a</b>umentada
        </p>
        <button
          style={{
            marginTop: "10px",
            paddingInline: "40px",
            paddingBlock: "20px",
            borderColor: "gray",
            fontSize: "1.5rem",
          }}
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
