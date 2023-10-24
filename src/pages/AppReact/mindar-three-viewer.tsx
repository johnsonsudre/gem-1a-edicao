import { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";
import * as MindAR from "mind-ar/dist/mindar-image.prod";
import * as THREE from "three";
// import mindArUiScanning from "../../tools/checkMindArOverlay";
// import checkMindArOverlay from "../../tools/checkMindArOverlay";

export default () => {
  const containerRef = useRef(null);
  const [showCover, setShowCover] = useState("none");

  useEffect(() => {
    setShowCover("none");

    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/marker/graffiti-final.mind",
      filterMinCF: 0.0001,
      filterBeta: 0.001,
    });
    // console.log(MindAR);
    console.log(mindarThree.container);
    // mindArUiScanning.check();
    // mindArUiScanning.hide();

    const { renderer, scene, camera } = mindarThree;
    console.log(renderer);
    const anchor = mindarThree.addAnchor(0);
    const geometry = new THREE.PlaneGeometry((1 / 21) * 20, (1 / 29) * 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    anchor.group.add(plane);

    mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
    // checkMindArOverlay();
    return () => {
      renderer.setAnimationLoop(null);
      mindarThree.stop();
    };
  }, []);

  return (
    <div>
      {showCover ? (
        <div
          style={{ width: "100vw", height: "100vh" }}
          ref={containerRef}
        ></div>
      ) : null}
    </div>
  );
};
