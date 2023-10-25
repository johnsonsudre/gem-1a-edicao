import { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";
// import * as MindAR from "mind-ar/dist/mindar-image.prod";
import * as THREE from "three";
// import mindArUiScanning from "../../tools/checkMindArOverlay";
import checkMindArOverlay from "../../tools/checkMindArOverlay";
import { useNavigate } from "react-router-dom";
import { closeFullscreen, openFullscreen } from "../../tools/fullcreen";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";

// const Loading = () => {
//   return (
//     <>
//       <h1>Carregando</h1>
//     </>
//   );
// };

// const Scanning = () => {
//   return (
//     <>
//       <h1>Rastreando</h1>
//     </>
//   );
// };

// const Error = () => {
//   return (
//     <>
//       <h1>Erro</h1>
//     </>
//   );
// };
export default () => {
  const [showRA, setShowRA] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  class ARController {
    mindThree;
    visibility;
    hidden;
    showing;
    constructor(mt?) {
      this.hidden = "hidden";
      this.showing = "inherit";
      this.mindThree = mt ? mt : null;
      if (this.mindThree) {
        this.visibility = this.mindThree.ui.scanningMask.style.visibility;
      }
    }
    init(mt) {
      this.mindThree = mt;
    }
    // RA
    stopScanning() {
      if (this.mindThree) {
        // this.mindThree.renderer.setAnimationLoop(null);
        this.mindThree.stop();
      }
    }
    startScanning() {
      if (this.mindThree) this.mindThree.start();
    }
    // UI
    hideScanning() {
      if (this.mindThree)
        this.mindThree.ui.scanningMask.style.visibility = this.hidden;
    }
    showScanning() {
      if (this.mindThree)
        this.mindThree.ui.scanningMask.style.visibility = this.showing;
    }

    showLoading() {
      if (this.mindThree)
        this.mindThree.ui.loadingModal.style.visibility = this.showing;
    }

    hideLoading() {
      if (this.mindThree)
        this.mindThree.ui.loadingModal.style.visibility = this.hidden;
    }

    showCompatibilityModal() {
      if (this.mindThree)
        this.mindThree.ui.compatibilityModal.style.visibility = this.showing;
    }

    hideCompatibilityModal() {
      if (this.mindThree)
        this.mindThree.ui.compatibilityModal.style.visibility = this.hidden;
    }
    showUI() {
      this.showLoading();
      this.showScanning();
      this.showCompatibilityModal();
    }
    hideUI() {
      this.hideLoading();
      this.hideScanning();
      this.hideCompatibilityModal();
    }
  }

  const arController = new ARController();

  // mindARThree.container = containerRef.current;
  useEffect(() => {
    console.log(MindARThree);
    const mindARThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/marker/graffiti-final.mind",
      filterMinCF: 0.0001,
      filterBeta: 0.001,
    });
    arController.init(mindARThree);
    setShowRA(false);

    // controlUI.hideUI();

    const { renderer, scene, camera } = mindARThree;
    const anchor = mindARThree.addAnchor(0);
    const geometry = new THREE.PlaneGeometry((1 / 21) * 20, (1 / 29) * 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    anchor.group.add(plane);

    mindARThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
    return () => {
      checkMindArOverlay.hide();
      renderer.setAnimationLoop(null);
      mindARThree.stop();
    };
  }, []);

  return (
    <>
      {!showRA && (
        <img
          src={projectLogo}
          className="logo logo-instructions"
          alt="GeM Logo"
          style={{
            width: "250%",
            height: "250%",
            // position: "initial",
            position: "absolute",
            top: "-80%",
            right: 0,
            opacity: "2%",
          }}
        />
      )}
      <div
        className="card"
        style={{
          visibility: showRA ? "hidden" : "inherit",
          fontSize: "1.35rem",
          top: "50%",
        }}
      >
        <h3>Instruções</h3>

        <p>1 - Dê permissão para acessar a câmera</p>
        <p>2 - Aponte a câmera do aparelho para o graffiti</p>
      </div>
      <button
        onClick={() => {
          closeFullscreen();
          if (!showRA) {
            navigate("/");
          } else {
            setShowRA(!showRA);
            arController.stopScanning();
          }
        }}
        className="stopButtonInsideAR"
        style={{
          // right: showRA ? "2rem" : "50%",
          justifyContent: "center",
          alignItems: "center",
          // display: "flex",
        }}
      >
        Voltar
      </button>
      <button
        onClick={() => {
          openFullscreen("root");
          setShowRA(!showRA);
          arController.showScanning();
        }}
        className="stopButtonInsideAR"
        style={{ right: "50%", visibility: showRA ? "hidden" : "inherit" }}
      >
        Iniciar
      </button>
      <div style={{ display: "block" }}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            // visibility: showRA ? "inherit" : "hidden",
            opacity: showRA ? "100%" : "5%",
          }}
          ref={containerRef}
        ></div>
      </div>
    </>
  );
};
