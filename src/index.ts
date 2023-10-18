import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  FXAAEffect,
} from "postprocessing";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import { randomBetween } from "./utils";

// console.log(UnrealBloomPass);
// console.log(MindARThree);

let mixer: THREE.AnimationMixer;

/** Particulas */

const startParticles = () => {
  const scaleFactor = 0.01;
  const particleTexture = new THREE.TextureLoader().load("images/spark.png");
  let particleGroup = new THREE.Object3D();
  let particleAttributes = { startSize: [], startPosition: [], randomness: [] };
  var totalParticles = 1000;
  var radiusRange = 3;
  for (var i = 0; i < totalParticles; i++) {
    var spriteMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xffffff,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(
      Math.random() * scaleFactor,
      Math.random() * scaleFactor,
      1.0
    ); // imageWidth, imageHeight
    sprite.position.set(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    );
    // for a cube:
    // sprite.position.multiplyScalar( radiusRange );
    // for a solid sphere:
    // sprite.position.setLength( radiusRange * Math.random() );
    // for a spherical shell:
    sprite.position.setLength(radiusRange * (Math.random() * 0.1 + 0.9));
    // sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() );
    sprite.material.color.setHSL(Math.random(), 0.9, 0.7);

    // sprite.opacity = 0.80; // translucent particles
    sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles

    particleGroup.add(sprite);
    // add variable qualities to arrays, if they need to be accessed later
    particleAttributes.startPosition.push(sprite.position.clone());
    particleAttributes.randomness.push(Math.random());
  }
  // particleGroup.position.y = -2;
  // particleGroup.position.z = -2;
  return particleGroup;
};

const updateParticleNoise = (particles: THREE.Object3D) => {
  const positionNoiseFactor = 0.002;
  const scaleNoiseFactor = 0.001;

  particles.children.map((dust) => {
    const { x: x_pos, y: y_pos, z: z_pos } = dust.position;
    const { x: x_scale, y: y_scale, z: z_scale } = dust.scale;
    // console.log(x, y, z);
    dust.position.set(
      x_pos + randomBetween(-positionNoiseFactor, positionNoiseFactor),
      y_pos + randomBetween(-positionNoiseFactor, positionNoiseFactor),
      z_pos + randomBetween(-positionNoiseFactor, positionNoiseFactor)
    );
    dust.scale.set(
      x_scale + randomBetween(-scaleNoiseFactor, scaleNoiseFactor),
      y_scale + randomBetween(-scaleNoiseFactor, scaleNoiseFactor),
      1
    );
  });
};

// automações
class rotateObjects {
  objects: any = [];
  constructor() {}
  check(obj: any) {
    if (obj.userData && obj.userData.rotate) {
      this.add({
        object: obj,
        axis: obj.userData.axis,
        velocity: obj.userData.velocity,
      });
    }
  }
  add(obj: any) {
    this.objects.push(obj);
  }
  update() {
    this.objects.map((item: any) => {
      item.object.rotation[item.axis] += item.velocity;
    });
  }
}

/** funcoes MindAR */
const startMindARThree = () => {
  return new MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "/marker/graffiti-final.mind",
    // suavização
    filterMinCF: 0.001,
    filterBeta: 0.01,
  });
};

/** inicia MindAR Three */
let mindarThree = startMindARThree();

// inicia render, scene, camera
const { renderer, scene, camera } = mindarThree;
renderer.powerPreference = "high-performance";
renderer.antialias = false;
renderer.stencil = false;
renderer.depth = false;
camera.near = 0.01;

const anchor = mindarThree.addAnchor(0);

/**  pós processamento */

// efeitos
// const effectBloom = new BloomEffect();
// const fxaaEffect = new FXAAEffect();

// renderPass :)
// const renderPass = new RenderPass(scene, camera);
// const effectPass = new EffectPass(camera, fxaaEffect, effectBloom);
// const effectPass = new EffectPass(camera, effectBloom);
// const effectPass = new EffectPass(camera);

// composição
// const composer = new EffectComposer(renderer);
// composer.addPass(renderPass);
// composer.addPass(effectPass);

/** prepara cena */

const objectsToBeRotate = new rotateObjects();

// Adiciona particulas
const particles = startParticles();
anchor.group.add(particles);

// Adicionar luz ambiente
var ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 20;
anchor.group.add(ambientLight);

/** carrega modelos elementos de cena */
var loader = new GLTFLoader();
loader.load("assets/animacao-ufes.glb", function (gltf) {
  // carrega modelo
  const model = gltf.scene;
  console.log(model);
  anchor.group.add(model);
  // configura cena
  model.traverse(function (object: any) {
    objectsToBeRotate.check(object);
    // if (object.userData.noShadow) console.log(object.userData);
    if (object.isMesh) {
      if (!object.userData.noShadow) object.castShadow = true;
    }
    if (object.material) {
      console.log(object.material.userData.emissive);
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

  // carrega esqueleto
  // const skeleton = new THREE.SkeletonHelper(gltf.scene);
  // skeleton.visible = false;
  // anchor.group.add(skeleton);
  // console.log(skeleton);

  // Animação
  // Obter o mixer para a animação
  mixer = new THREE.AnimationMixer(model);

  // Adicionar o clip de animação (assumindo que é o primeiro clip)
  var clip = gltf.animations[0];
  mixer.clipAction(clip).play();
});

/** inicia LOOP */
const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    // composer.render();
    const camera_dist = new THREE.Vector3();
    camera.getWorldPosition(camera_dist);
    console.log(camera_dist.length());
    renderer.render(scene, camera);
    objectsToBeRotate.update();
    updateParticleNoise(particles);
    if (mixer) {
      mixer.update(0.01);
    }
  });
};

const startButton = document.querySelector("#startButton");
startButton &&
  startButton.addEventListener("click", () => {
    start();
  });

const stopButton = document.querySelector("#stopButton");

stopButton &&
  stopButton.addEventListener("click", () => {
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
  });
