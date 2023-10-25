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
  let mindARThree: MindARThree;
  let mixer: THREE.AnimationMixer;

  const arController = new ARController();

  // mindARThree.container = containerRef.current;
  useEffect(() => {
    openFullscreen("root");
    console.log(MindARThree);
    mindARThree = new MindARThree({
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
    var ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.intensity = 20;
    anchor.group.add(ambientLight);
    mindARThree.container.addEventListener("arReady", () => {
      console.log("MindAR esta pronto");
    });

    // carrega um recurso/modelo glTF
    loader.load(
      // URL do recurso/modelo
      "/assets/animacao-ufes.glb",
      // chamado quando o recurso é carregado
      function (gltf) {
        // scene.add(gltf.scene);
        console.log(gltf);
        const model = gltf.scene;
        model.position.set(0, 0.015, 0);
        // gltf.scene.scale.set(1.15, 1.15, 1.15);
        anchor.group.add(model);
        mixer = new THREE.AnimationMixer(model);
        var clip = gltf.animations[0];
        mixer.clipAction(clip).play();

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      },
      // chamado enquanto o carregamento esta progredindo
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // chamado quando ocorre erro no carregamento
      function (error) {
        console.log("Ocorreu um erro no carregamento do modelo", error);
      }
    );

    mindARThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      if (mixer) {
        mixer.update(0.01);
      }
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
