import * as THREE from "three";

export class Dust {
  particleSize;
  particleVelocity;
  limit;
  particleCount;
  particlesGeometry;
  positions;
  velocities;
  colors;
  map;
  particlesMaterial;
  particleSystem;
  constructor(map) {
    // Geometria e material das partículas
    this.particleSize = 100;
    this.particleVelocity = 0.002;
    this.limit = { x: 6, y: 3, z: 4 };
    this.particleCount = 500;
    this.particlesGeometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);
    this.colors = new Float32Array(this.particleCount * 3); // Adicionar cores
    this.map = map;

    for (let i = 0; i < this.particleCount; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * this.limit.x;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * this.limit.y;
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * this.limit.z;

      this.velocities[i * 3] = (Math.random() - 0.5) * this.particleVelocity;
      this.velocities[i * 3 + 1] =
        (Math.random() - 0.5) * this.particleVelocity;
      this.velocities[i * 3 + 2] =
        (Math.random() - 0.5) * this.particleVelocity;

      // Adicionar cores aleatórias
      const randColor = Math.random();
      this.colors[i * 3] = randColor / 2;
      this.colors[i * 3 + 1] = randColor / 1.5;
      this.colors[i * 3 + 2] = randColor;
    }

    this.particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.particlesGeometry.setAttribute(
      "velocity",
      new THREE.BufferAttribute(this.velocities, 3)
    );
    this.particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.colors, 3)
    ); // Definir atributo de cor

    this.particlesMaterial = new THREE.PointsMaterial({
      size: this.particleSize,
      map: this.map,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexColors: true, // Habilitar cores por vértice
    });

    this.particleSystem = new THREE.Points(
      this.particlesGeometry,
      this.particlesMaterial
    );
  }

  update() {
    const positions = this.particlesGeometry.attributes.position.array;
    const velocities = this.particlesGeometry.attributes.velocity.array;

    for (let i = 0; i < this.particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      if (
        positions[i * 3] > this.limit.x / 2 ||
        positions[i * 3] < -this.limit.x / 2
      )
        velocities[i * 3] *= -1;
      if (
        positions[i * 3 + 1] > this.limit.y / 2 ||
        positions[i * 3 + 1] < -this.limit.y / 2
      )
        velocities[i * 3 + 1] *= -1;
      if (
        positions[i * 3 + 2] > this.limit.z / 2 ||
        positions[i * 3 + 2] < -this.limit.z / 2
      )
        velocities[i * 3 + 2] *= -1;
    }

    this.particlesGeometry.attributes.position.needsUpdate = true;
  }
}
