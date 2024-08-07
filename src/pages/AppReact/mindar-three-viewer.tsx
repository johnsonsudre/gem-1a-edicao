/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/** Threejs & MindAR */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";

/** React */
import { ARController } from "./ARController";
// import { startParticles, updateParticleNoise } from "./particles";
import { rotateObjects } from "./rotateObjects";
import { SetAnchorEvents } from "./SetAnchor";
import projectLogo from "/logo-graffitiemmovimento-branco.svg";
import checkMindArOverlay from "../../tools/checkMindArOverlay";
import { closeFullscreen, openFullscreen } from "../../tools/fullcreen";
import { Dust } from "./Dust";

/** principal */
export default () => {
  const zIndexMaxValue = 2147483000;
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

    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load("images/dust.png");

    /** Inicia controlador para mindAR */
    if (containerRef.current) arController.init(containerRef.current);
    arController.setZIndex(zIndexMaxValue);
    mindARThree = arController.mindARThree;

    /** desetrutura objetos necessários */
    const { renderer, scene, camera } = mindARThree;
    camera.near = 0.1;
    camera.far = 10.0;

    /**  */
    const anchor = mindARThree.addAnchor(0);
    SetAnchorEvents(anchor);

    /** iluminação do ambiente */
    // var ambientLight = new THREE.HemisphereLight(0xffffff);
    // ambientLight.intensity = 1;
    // anchor.group.add(ambientLight);

    /** prepara cena */
    const objectsToBeRotate = new rotateObjects();

    /** Adiciona particulas */
    const dust = new Dust(particleTexture);
    dust.setParticleCount(500);
    dust.setParticleSize(150);
    anchor.group.add(dust.particleSystem);

    /**  carrega um recurso/modelo glTF */
    loader.load(
      // URL do recurso/modelo
      "/assets/animacao-ufes.glb",
      // chamado quando o recurso é carregado
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0.015, 0);
        model.scale.set(3, 3, 3);
        model.traverse(function (object: any) {
          let lPos = object.position;
          if (object.name === "galaxia") {
            const light = new THREE.AmbientLight(0xffffff, 1);
            light.position.set(lPos.x, lPos.y, lPos.z);
            model.add(light);
          }
          // if (object.userData.alphaMap) {
          //   if (object.userData.alphaMap === "faces") {
          //     object.material.alphaMap = new THREE.TextureLoader().load(
          //       "images/graffiti-alpha-mask.png"
          //     );
          //   }
          // }
          objectsToBeRotate.check(object);
          if (object.isMesh) {
            if (!object.userData.noShadow) object.castShadow = true;
          }
        });

        anchor.group.add(model);

        /** inicia animação */
        mixer = new THREE.AnimationMixer(model);
        var clips = gltf.animations;
        clips.map((thisClip) => {
          mixer.clipAction(thisClip).play();
        });
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
      // updateParticleNoise(dust);
      dust.update();
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
              arController.reset();
            } else {
              setShowRA(!showRA);
            }
          }}
          className="buttonsInsideAR"
          style={{
            opacity: showRA ? "25%" : "100%",
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
              paddingRight: "10px",
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
            opacity: showRA ? "100%" : "15%",
          }}
          ref={containerRef}
        ></div>
      </div>
    </>
  );
};
