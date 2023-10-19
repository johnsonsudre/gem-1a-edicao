import { useNavigate } from "react-router-dom";
import "./About.css";
function template() {
  const navigate = useNavigate();
  return (
    <div className="about">
      <h1>Sobre o projeto</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default template;
