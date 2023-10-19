import "./GraffitiRA.css";
import { useNavigate } from "react-router-dom";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import * as THREE from "three";
import { MindARThree } from "./mindarthree.d.ts";

// import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";
import { useEffect, useRef } from "react";

// import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

// import "mind-ar/dist/mindar-image-aframe.prod.js";
// import "mind-ar/dist/mindar-image-three.prod.js";

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
  const navigate = useNavigate();
  const container = useRef(null);
  useEffect(() => {
    const element = container.current;
    /** inicia MindAR Three s*/
    let mindarThree = startMindARThree(element);

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

    //
  });
  return (
    <>
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/dist/mindar-image.prod.js"></script>
        <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/dist/mindar-image-aframe.prod.js"></script>
      </head> */}
      <div className="graffiti-ra">
        <h1>GraffitiRA</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Sair
        </button>
      </div>
      <div ref={container} id="container"></div>
    </>
  );
}

export default template;
