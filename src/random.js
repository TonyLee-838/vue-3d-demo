export function rand(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + (max - min) * Math.random();
}

export function randomColor() {
  return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
}

export function randomPosition() {
  return {
    x: rand(-1.5, 1.5),
    y: rand(-1.5, 1.5),
    z: rand(-1.5, 1.5),
  };
}

export function randomRotation() {
  return {
    x: rand(Math.PI),
    y: rand(Math.PI),
    z: rand(0),
  };
}

export function randomScale() {
  return {
    x: rand(1, 1.2),
    y: rand(1, 1.2),
    z: rand(1, 1.2),
  };
}
