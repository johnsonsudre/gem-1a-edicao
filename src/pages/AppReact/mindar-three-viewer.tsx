import { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";
import * as MindAR from "mind-ar/dist/mindar-image.prod";
import * as THREE from "three";
import mindArUiScanning from "../../tools/checkMindArOverlay";
import checkMindArOverlay from "../../tools/checkMindArOverlay";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  return (
    <>
      <h1>Carregando</h1>
    </>
  );
};

const Scanning = () => {
  return (
    <>
      <h1>Rastreando</h1>
    </>
  );
};

const Error = () => {
  return (
    <>
      <h1>Erro</h1>
    </>
  );
};
export default () => {
  const [showRA, setShowRA] = useState(false);
  const navigate = useNavigate();

  // mindARThree.container = containerRef.current;
  const containerRef = useRef(null);
  useEffect(() => {
    const mindARThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/marker/graffiti-final.mind",
      filterMinCF: 0.0001,
      filterBeta: 0.001,
    });
    setShowRA(false);
    // console.log(MindARThree);
    // console.log(MindAR);

    // Captura UI do MindAR
    const scanningMaskUI = mindARThree.ui.scanningMask;
    const loadingModalUI = mindARThree.ui.loadingModal;
    const compatibilityModalUI = mindARThree.ui.compatibilityModal;
    mindARThree.ui.hideScanning();

    // Controlador MindAR
    const mindARController = mindARThree.controller;
    // console.log(mindARController);
    // console.log(mindarThree);

    // TESTE UI MINDAR
    // console.log(MindAR);
    const Controller = window.MINDAR.IMAGE.Controller;
    const UI = window.MINDAR.IMAGE.UI;
    // const Controller = new MindAR.Controller();
    // const Compiler = new MindAR.Compiler();
    // const UI = new MindAR.UI(Loading, Scanning, Error);
    // console.log(window.MINDAR);

    // FIM TESTE MINDAR

    console.log(mindARThree.anchors);
    scanningMaskUI.classList.add("hidden");
    loadingModalUI.classList.add("hidden");
    compatibilityModalUI.classList.add("hidden");
    // console.log(scanningMaskUI);

    // UI.claloadingModalUIssList.add("hidden");

    scanningMaskUI.style.visibility = "hidden";
    loadingModalUI.style.visibility = "hidden";
    compatibilityModalUI.style.visibility = "hidden";

    // mindarThree.ui.scanningMask.style.display = "none"; // valor padrão é block ou inline
    // mindarThree.ui.loadingModal.style.display = "none";
    // console.log(MindAR);
    // mindarThree.ui
    // mindArUiScanning.check();
    // mindArUiScanning.hide();

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
      <button
        onClick={() => {
          if (!showRA) {
            navigate("/");
          } else {
            setShowRA(!showRA);
          }
        }}
        className="stopButtonInsideAR"
      >
        Voltar
      </button>
      <button
        onClick={() => {
          setShowRA(!showRA);
        }}
        className="stopButtonInsideAR"
        style={{ top: "6rem", visibility: showRA ? "hidden" : "inherit" }}
      >
        Iniciar
      </button>

      <div style={{ display: "block" }}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            visibility: showRA ? "inherit" : "hidden",
          }}
          ref={containerRef}
        ></div>
      </div>
    </>
  );
};
