import * as THREE from 'three';
import { Car } from './objects';

export class World {
  constructor(experience) {
    this.experience = experience;

    this.car = new Car(experience, {
      color: 0x0000ff,
      position: new THREE.Vector3(0, 0, 0),
      polygonOffsetEnabled: true
    });
  }

  update(...arg) {
    if (this.cube) {
      this.cube.update(...arg);
    }
    if (this.car) {
      this.car.update(...arg);
    }
  }
}
