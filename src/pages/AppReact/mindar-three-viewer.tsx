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
// import { randomBetween } from "../../tools/randomBetween";
import { startParticles, updateParticleNoise } from "./particles";
import { rotateObjects } from "./rotateObjects";

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

  useEffect(() => {
    openFullscreen("root");

    /** Inicia controlador para mindAR */
    arController.init(containerRef.current);
    arController.setZIndex(2147483000);
    mindARThree = arController.mindARThree;

    /** desetrutura objetos necessários */
    const { renderer, scene, camera } = mindARThree;
    // console.log(mindARThree);
    // console.log(camera.position);
    // console.log(controller);

    /**  */
    const anchor = mindARThree.addAnchor(0);

    /** EVENTS  */
    // console.log(anchor.group);
    anchor.onTargetFound = () => {
      // console.log("Imagem encontrada. Rastreando ....");
      // console.log(camera.position);
    };
    anchor.onTargetLost = () => {
      // console.log("Imagem perdida");
    };

    anchor.onTargetUpdate = () => {
      // console.log("onTargetUpdate");
      // console.log(camera.position);
    };

    // console.log(mindARThree.controller.workerTrackDone);
    /** iluminação do ambiente */
    var ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.intensity = 20;
    anchor.group.add(ambientLight);

    /** testa addeventlistener arReady */
    // console.log(window["MINDAR"]["IMAGE"]);

    // automações

    /** prepara cena */

    const objectsToBeRotate = new rotateObjects();

    /** Adiciona particulas */
    const dust = startParticles();
    anchor.group.add(dust);

    /**  carrega um recurso/modelo glTF */
    loader.load(
      // URL do recurso/modelo
      "/assets/animacao-ufes.glb",
      // chamado quando o recurso é carregado
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0.015, 0);
        anchor.group.add(model);
        model.traverse(function (object: any) {
          console.log(object.userData);
          if (object.userData.alphaMap) {
            if (object.userData.alphaMap === "faces") {
              object.material.alphaMap = new THREE.TextureLoader().load(
                "images/graffiti-alpha-mask.png"
              );
              console.log(object.material);
            }
          }
          objectsToBeRotate.check(object);
          if (object.isMesh) {
            if (!object.userData.noShadow) object.castShadow = true;
          }
          if (object.material) {
            // console.log(object.material.userData.emissive);
            // if (object.material.userData.emissive) {
            //   console.log(object.material.emissive);
            //   const colorEmissive = new THREE.Color("#ffffff");
            //   // console.log(colorEmissive);
            //   object.material.emissive = colorEmissive;
            //   object.material.emissiveIntensity = 10;
            //   object.material.toneMapped = false;
            // }
          }
        });

        /** inicia animação */
        mixer = new THREE.AnimationMixer(model);
        // var clip = gltf.animations[0];
        var clips = gltf.animations;
        clips.map((thisClip) => {
          console.log(`iniciar animação ${thisClip.name}`);
          mixer.clipAction(thisClip).play();
        });
        /** exemplos
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        */
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

    /** iniciar rastreamento */
    arController.start();

    /** inicia loop */
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      objectsToBeRotate.update();
      updateParticleNoise(dust);
      if (mixer) {
        mixer.update(0.01);
      }
    });

    /**  */
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
      <div className="card-buttons">
        <button
          onClick={() => {
            if (!showRA) {
              closeFullscreen();
              navigate("/");
              // arController.stop();
              arController.reset();
            } else {
              setShowRA(!showRA);
              // arController.stop();
            }
          }}
          className="buttonsInsideAR"
          style={{
            // right: showRA ? "47%" : "44%",
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
          className="buttonsInsideAR"
          style={{
            display: showRA ? "none" : "flex",
            backgroundColor: "green",
            justifyContent: "center" /* Centraliza horizontalmente */,
            alignItems: "center" /* Centraliza verticalmente */,
          }}
        >
          <img
            src="play.svg"
            style={{
              //   fill: "red",
              paddingRight: "10px",
              //   margin: "-5px",
              //   alignItems: "center" /* Centraliza verticalmente */,
            }}
          ></img>
          Iniciar
        </button>
      </div>
      <div style={{ display: "block" }}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            // visibility: showRA ? "inherit" : "hidden",
            opacity: showRA ? "100%" : "15%",
          }}
          ref={containerRef}
        ></div>
      </div>
    </>
  );
};
