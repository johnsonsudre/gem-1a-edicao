import { useNavigate } from "react-router-dom";
import "./About.css";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";
import artistPhoto from "/images/about/foto-artista-luhan.jpg";

function template() {
  const navigate = useNavigate();
  return (
    <div id="about" className="flex-column">
      <h1>Sobre</h1>
      <div className="flex-container">
        <div className="flex-item-text">
          O projeto{" "}
          <b style={{ fontWeight: "normal" }}>Graffiti em Movimento</b> tem o
          objetivo de inserir no cotidiano capixaba novas formas de interação
          com as cidades a partir do encontro da arte digital e da arte urbana.
          Um aplicativo de realidade aumentada vai oferecer uma nova experiência
          através da pintura produzida pelo artista Luhan Gaba.
        </div>
        <div className="project-logo">
          <img
            className="flex-item-project-logo"
            src={projectLogo}
            alt="GeM Logo"
          />
        </div>
      </div>
      <div className="flex-container">
        <div className="flex-item-artist-image">
          <a
            href="https://www.instagram.com/luhan.gaba/"
            style={{ fontWeight: "normal" }}
          >
            <img src={artistPhoto} className="flex-item-img-artist" />
          </a>
        </div>
        <div className="flex-item-text">
          <a
            href="https://www.instagram.com/luhan.gaba/"
            style={{ fontWeight: "normal" }}
          >
            Luhan Gaba:
          </a>{" "}
          Escritor de Graffiti desde 2008. A partir de 2011 vem desenvolvendo um
          estilo com forte influência da arte Pan-africana e suas vertentes
          espalhadas pela diáspora negra, reafirmando a ligação com suas raízes
          ancestrais e buscando uma representatividade maior para o povo negro,
          usando o graffiti como ferramenta social de combate ao racismo.
        </div>
      </div>
      <div>
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
