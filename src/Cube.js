import * as THREE from "three";

export default class Cube {
  constructor() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setPosition(position) {
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
  }
  setScale(scale) {
    this.mesh.scale.x = scale.x;
    this.mesh.scale.y = scale.y;
    this.mesh.scale.z = scale.z;
  }
  setRotation(rotation) {
    this.mesh.rotation.x = rotation.x;
    this.mesh.rotation.y = rotation.y;
    this.mesh.rotation.z = rotation.z;
  }

  setColor(color) {
    this.material.color = color;
  }

  getRotateOperation = (speedX, speedY) => (time) => {
    this.mesh.rotation.x = time * speedX;
    this.mesh.rotation.y = time * speedY;
  };
}
