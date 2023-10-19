import "./GraffitiRA.css";
import { useNavigate } from "react-router-dom";

function template() {
  const navigate = useNavigate();
  return (
    <div className="graffiti-ra">
      <h1>GraffitiRA</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Sair
      </button>
    </div>
  );
}

export default template;
