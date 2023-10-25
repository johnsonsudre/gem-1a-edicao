import { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";
// import * as MindAR from "mind-ar/dist/mindar-image.prod";
import * as THREE from "three";
// import mindArUiScanning from "../../tools/checkMindArOverlay";
import checkMindArOverlay from "../../tools/checkMindArOverlay";
import { useNavigate } from "react-router-dom";
import { closeFullscreen, openFullscreen } from "../../tools/fullcreen";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { ARController } from "./ARController";

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
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
  loader.setDRACOLoader(dracoLoader);

  const arController = new ARController();

  // mindARThree.container = containerRef.current;
  useEffect(() => {
    openFullscreen("root");

    console.log(MindARThree);
    const mindARThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/marker/graffiti-final.mind",
      filterMinCF: 0.001,
      filterBeta: 0.01,
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
    mindARThree.container.addEventListener("arReady", (event) => {
      console.log("MindAR is ready");
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
          zIndex: "2147483647",
        }}
      >
        <h3>Instruções</h3>

        <p>1 - Dê permissão para acessar a câmera</p>
        <p>2 - Aponte a câmera do aparelho para o graffiti</p>
      </div>
      <button
        onClick={() => {
          if (!showRA) {
            closeFullscreen();
            navigate("/");
          } else {
            setShowRA(!showRA);
            arController.stopScanning();
          }
        }}
        className="stopButtonInsideAR"
        style={{
          right: showRA ? "47%" : "44%",
          opacity: showRA ? "25%" : "100%",
          // justifyContent: "center",
          // alignItems: "center",
          // display: "flex",
        }}
      >
        Voltar
      </button>
      <button
        onClick={() => {
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
