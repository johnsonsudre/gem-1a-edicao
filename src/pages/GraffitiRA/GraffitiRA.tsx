import "./GraffitiRA.css";
import { useNavigate } from "react-router-dom";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import * as THREE from "three";
// import { MindARThree } from "./mindarthree.d.ts";
import { useRef, useEffect } from "react";

import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";
// import { useEffect, useRef } from "react";

// import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

// import "mind-ar/dist/mindar-image-aframe.prod.js";
// import "mind-ar/dist/mindar-image-three.prod.js";
// let mindar: MindARThree;
/** funcoes MindAR */
const startMindARThree = (container: any) => {
  // const container = document.getElementById("#container");
  console.log(container);
  return new MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "/marker/graffiti-final.mind",
    // suavização
    filterMinCF: 0.001,
    filterBeta: 0.01,
  });
};

function template() {
  console.log("Tela de instruções");
  const navigate = useNavigate();
  const container = useRef(null);
  const start = useRef(null);
  const stop = useRef(null);
  const cover = useRef(null);

  useEffect(() => {
    const element = container.current;
    /** inicia MindAR Three s*/
    let mindarThree = startMindARThree(element);

    // const startButton = start.current;
    // const stopButton = stop.current;

    // inicia render, scene, camera
    const { renderer, scene, camera } = mindarThree;
    renderer.powerPreference = "high-performance";
    renderer.antialias = false;
    renderer.stencil = false;
    renderer.depth = false;
    camera.near = 0.01;
    scene.name = "graffiti";

    //
    const anchor = mindarThree.addAnchor(0);

    //
    var ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.intensity = 20;
    anchor.group.add(ambientLight);
    /** inicia LOOP */
    const startMindAR = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        // composer.render();
        // const camera_dist = new THREE.Vector3();
        // camera.getWorldPosition(camera_dist);
        // console.log(camera_dist.length());
        renderer.render(scene, camera);
        // objectsToBeRotate.update();
        // updateParticleNoise(particles);
        // if (mixer) {
        //   mixer.update(0.01);
        // }
      });
    };
    const start = () => {
      console.log("inicia RA");
      startMindAR();
    };
    document.getElementById("start")!["onClick"] = start;

    document.getElementById("stop")!["onClick"] = () => {
      if (mindarThree.stop) mindarThree.stop();
      mindarThree.renderer.setAnimationLoop(null);
      navigate("/");
    };
  });

  return (
    <>
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/dist/mindar-image.prod.js"></script>
        <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/dist/mindar-image-aframe.prod.js"></script>
      </head> */}
      <div ref={container} id="container"></div>
      <div ref={cover} className="graffiti-ra">
        <h3>Instruções</h3>
        <p>1 - Dê permissão para acessar a câmera</p>
        <p>2 - Aponte a câmera do aparelho para o graffiti</p>
        <button ref={start} id="start">
          Iniciar
        </button>
        <button ref={stop} id="stop">
          Sair
        </button>
      </div>
    </>
  );
}

export default template;
