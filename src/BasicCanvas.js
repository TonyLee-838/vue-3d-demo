import * as THREE from "three";
const CAMERA_FOV = 50;
const CAMERA_ASPECT = 2;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 5;
const CAMERA_INIT_Z_POSITION = 4;

const LIGHT_INIT_POSITION = {
  X: -1,
  Y: 2,
  Z: 4,
};

const REFRESH_TIME = 0.01;

export default class BasicCanvas {
  constructor(canvas) {
    this.element = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      CAMERA_ASPECT,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    this.camera.position.z = CAMERA_INIT_Z_POSITION;

    this.scene = new THREE.Scene();
    this.setupLight();
  }

  setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(
      LIGHT_INIT_POSITION.X,
      LIGHT_INIT_POSITION.Y,
      LIGHT_INIT_POSITION.Z
    );
    this.scene.add(light);
  }

  optimizeDisplay() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) this.renderer.setSize(width, height, false);

    return needResize;
  }

  render(operations) {
    const run = (time) => {
      time *= REFRESH_TIME;

      if (this.optimizeDisplay(this.renderer)) {
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }
      operations.forEach((operations) => operations(time));

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }
}
