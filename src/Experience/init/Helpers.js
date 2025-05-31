import * as THREE from 'three';

export class Helpers {
  constructor(experience) {
    this.experience = experience;

    this.createHelpers();
  }

  createHelpers() {
    // Axes helper
    this.axesHelper = new THREE.AxesHelper(5);
    this.axesHelper.visible = false;
    this.experience.scene.add(this.axesHelper);

    this.experience.debug.gui.add(this.axesHelper, 'visible').name('Axes visible');
  }
}
