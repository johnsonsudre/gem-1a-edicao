import * as THREE from "three";
import { randomBetween } from "../../tools/randomBetween";

const startParticles = () => {
  const scaleFactor = 0.01;
  const particleTexture = new THREE.TextureLoader().load("images/spark.png");
  let particleGroup = new THREE.Object3D();
  let particleAttributes: {
    startSize: number[];
    startPosition: THREE.Vector3[];
    randomness: number[];
  } = {
    startSize: [],
    startPosition: [],
    randomness: [],
  };
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
  const positionNoiseFactor = 0.001;
  const scaleNoiseFactor = 0.001;

  particles.children.map((dust) => {
    const { x: x_pos, y: y_pos, z: z_pos } = dust.position;
    const { x: x_scale, y: y_scale } = dust.scale;
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

export { startParticles, updateParticleNoise };
