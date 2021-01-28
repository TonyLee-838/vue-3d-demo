<template>
  <canvas id="app" ref="canvasRef" @mousemove="handleMouseMove"></canvas>
  <div class="enter" v-if="entered">Entered!!</div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import Cube from "./Cube";
import BasicCanvas from "./BasicCanvas";
import Picker from "./Picker";
import {
  randomColor,
  randomPosition,
  randomRotation,
  randomScale,
} from "./random";

export default {
  name: "App",
  setup() {
    //states
    const canvasRef = ref(null);
    const entered = ref(false);
    const pickPosition = reactive({ x: -10000, y: -10000 });

    //handler
    const handleMouseMove = ref(null);

    const run = (canvasEl) => {
      const canvas = new BasicCanvas(canvasEl);
      const picker = new Picker(canvas);

      handleMouseMove.value = (event) => {
        pickPosition.x = picker.normalizeX(event);
        pickPosition.y = picker.normalizeY(event);
      };

      picker.onEnter = (pickedObject, time) => {
        console.log("Entered!");
        entered.value = true;
        pickedObject.material.emissive.setHex(
          (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000
        );
      };

      picker.onLeave = (lastPickedObject) => {
        console.log("Left!");
        lastPickedObject.material.emissive.setHex(0);
        lastPickedObject = undefined;
        entered.value = false;
      };

      const operations = Array.from({ length: 50 }).map(() => {
        const cube = new Cube();
        canvas.scene.add(cube.mesh);
        cube.setPosition(randomPosition());

        return cube.getRotateOperation(0.1, 0.1);
        // cube.setScale(randomScale());
        // cube.setRotation(randomRotation());
        // cube.setColor(randomColor());
      });

      const detectPickerOperation = (time) => {
        picker.pick(pickPosition, time);
      };

      canvas.render([detectPickerOperation, ...operations]);
    };
    onMounted(() => {
      run(canvasRef.value);
    });

    return { canvasRef, handleMouseMove, entered };
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  display: block;
}
.enter {
  position: absolute;
  background-color: #eaeaea;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100px;
  height: 30px;
  border-radius: 15px;
}
</style>
