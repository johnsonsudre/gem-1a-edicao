import { useNavigate } from "react-router-dom";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";
import artistPhoto from "/images/about/foto-artista-johnson.jpg";
import artist1Photo from "/images/about/foto-artista-luhan.jpg";
import artist2Photo from "/images/about/foto-artista-leandro.jpg";
import patro1Logo from "/images/about/funcultura-branco-h.png";
import patro2Logo from "/images/about/secult-branco-h.png";
import "./About.css";

function template() {
  const navigate = useNavigate();
  return (
    <div id="about" className="flex-column">
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar
        </button>
      </div>
      <div>
        <h1>Sobre</h1>
        <div className="flex-container">
          <div className="flex-item-text">
            O projeto{" "}
            <b style={{ fontWeight: "normal" }}>Graffiti em Movimento</b> tem o
            objetivo de inserir no cotidiano capixaba novas formas de interação
            com as cidades a partir do encontro da arte digital e da arte
            urbana. Um aplicativo de realidade aumentada vai oferecer uma nova
            experiência através da pintura produzida pelo artista Luhan Gaba.
          </div>
          <div className="project-logo">
            <img
              className="flex-item-project-logo"
              src={projectLogo}
              alt="GeM Logo"
            />
          </div>
        </div>
      </div>
      <hr />
      <h1>Equipe</h1>
      <div className="flex-container">
        <div
          style={{ transform: "rotate(-2deg)" }}
          className="flex-item-artist-image"
        >
          <a href="">
            <img src={artistPhoto} className="flex-item-img-artist" />
          </a>
        </div>
        <div className="flex-item-text">
          <a href="" style={{ fontWeight: "normal" }}>
            Johnson Sudré:
          </a>{" "}
          Coordenador do projeto é artista digital, programador, produtor
          cultural. Como artista visual considera-se um desespecialista, que
          experimenta a partir da linguagem digital as múltiplas possibilidades
          que esta oferece e vasculha nesse contexto formas disruptiva do fazer
          artístico.
        </div>
      </div>

      <div className="flex-container">
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
        <div className="flex-item-artist-image">
          <a href="https://www.instagram.com/luhan.gaba/">
            <img src={artist1Photo} className="flex-item-img-artist" />
          </a>
        </div>
      </div>

      <div className="flex-container">
        <div
          style={{ transform: "rotate(-2deg)" }}
          className="flex-item-artist-image"
        >
          <a href="https://www.instagram.com/leandr.eira/">
            <img src={artist2Photo} className="flex-item-img-artist" />
          </a>
        </div>
        <div className="flex-item-text">
          <a
            href="https://www.instagram.com/leandr.eira/"
            style={{ fontWeight: "normal" }}
          >
            Leandro Pereira dos Santos:
          </a>{" "}
          Artista visual, pesquisador, Produtor cultural, Diretor de Fotografia,
          Editor de vídeo.
        </div>
      </div>
      <hr />
      <div>
        <h1>Patrocínio </h1>
        <div className="flex-container" style={{ padding: "20px" }}>
          <img
            style={{ height: "120px", padding: "20px", border: "0px solid" }}
            src={patro1Logo}
            alt="GeM Logo"
          />
          <img
            style={{ height: "120px", padding: "20px", border: "0px solid" }}
            src={patro2Logo}
            alt="GeM Logo"
          />
        </div>
      </div>
      <hr />
      <h1>Agradecimentos </h1>
      <div className="flex-container">
        <div className="flex-item-text" style={{ width: "90%" }}>
          <p>Joice Mara Martins Lemos</p>
          <p>Vitor Amorim dos Reis</p>
          <p>UFES-CCHN: Grace Alves da Paixão</p>
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
