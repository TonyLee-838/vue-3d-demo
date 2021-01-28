import * as THREE from "three";
export default class Picker {
  onEnter = () => {};
  onLeave = () => {};

  constructor(canvas) {
    this.canvas = canvas;
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
  }

  pick(normalizedPosition, time) {
    // restore the color if there is a picked object

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, this.canvas.camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(
      this.canvas.scene.children
    );

    if (intersectedObjects.length) {
      const newObject = intersectedObjects[0].object;
      if (newObject === this.pickedObject) return;

      this.pickedObject = newObject;
      this.onEnter(this.pickedObject, time);
    } else {
      if (this.pickedObject) {
        this.onLeave(this.pickedObject);
        this.pickedObject = undefined;
      }
    }
  }

  getCanvasRelativePosition(event, canvasEl) {
    const rect = canvasEl.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvasEl.width) / rect.width,
      y: ((event.clientY - rect.top) * canvasEl.height) / rect.height,
    };
  }

  normalizeX(event) {
    const canvasEl = this.canvas.element;
    const pos = this.getCanvasRelativePosition(event, canvasEl);
    return (pos.x / canvasEl.width) * 2 - 1;
  }

  normalizeY(event) {
    const canvasEl = this.canvas.element;
    const pos = this.getCanvasRelativePosition(event, canvasEl);
    return (pos.y / canvasEl.height) * 2 - 1;
  }
}
