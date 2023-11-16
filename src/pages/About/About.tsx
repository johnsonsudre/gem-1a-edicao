import { useNavigate } from "react-router-dom";
import "./About.css";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";
import artistPhoto from "/images/about/foto-artista-luhan.jpg";

function template() {
  const navigate = useNavigate();
  return (
    <div id="about" className="flex-column" style={{}}>
      <h1 style={{ fontSize: "3.5em" }}>Sobre o projeto</h1>

      <div
        className="flex-container"
        style={{
          display: "flex",
          flex: "0.7",
          padding: "1em",
        }}
      >
        <div
          style={{
            padding: "20px",
            display: "flex",
            flex: "1",
            fontSize: "1.5em",
            textAlign: "justify",
            textJustify: "inter-word",
            fontWeight: "lighter",
            alignItems: "center",
            justifyContent: "center",
            textIndent: "50px",
          }}
        >
          O projeto Graffiti Em Movimento é uma iniciativa do programador
          @johnsonsudre e tem o objetivo de inserir no cotidiano capixaba novas
          formas de interação com as cidades através da arte urbana e
          tecnologias interativas. Um aplicativo de realidade aumentada vai
          permitir uma nova experiência de realidade aumentada a partir da
          pintura produzida pelo artista @luhangaba.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "0.7",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={projectLogo}
            // className="logo"
            alt="GeM Logo"
            style={{
              height: "10em",
              padding: "1.5em",
              willChange: "filter",
              transition: "filter 300ms",
              borderStyle: "solid",
            }}
          />
        </div>
      </div>
      <div
        className="flex-container"
        style={{
          display: "flex",
          flex: "0.7",
          padding: "5em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "0.7",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-5deg)",
          }}
        >
          <img
            src={artistPhoto}
            // className="logo"
            alt="GeM Logo"
            style={{
              height: "20em",
              padding: "1.5em",
              willChange: "filter",
              transition: "filter 300ms",
              border: "10px",
              borderStyle: "solid",
            }}
          />
        </div>
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            flex: "1",
            fontSize: "1.75em",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",

              fontWeight: "lighter",
              textIndent: "50px",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            <b>Luhan Gaba:</b> Escritor de Graffiti desde 2008. A partir de 2011
            vem desenvolvendo um estilo com forte influência da arte
            Pan-africana e suas vertentes espalhadas pela diáspora negra,
            reafirmando a ligação com suas raízes ancestrais e buscando uma
            representatividade maior para o povo negro, usando o graffiti como
            ferramenta social de combate ao racismo.
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: "6em" }}>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default template;
