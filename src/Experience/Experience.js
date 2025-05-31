import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { Camera, Debug, Helpers, Lights, Renderer, Sizes, Time } from './init';
import { World } from './World';
import { resolvePublicPath } from '../utils';

export class Experience {
  constructor(_canvas) {
    // Options
    this.canvas = _canvas;

    // Setup
    this.scene = new THREE.Scene();

    this.debug = new Debug(this);
    this.helpers = new Helpers(this);

    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = new World(this);
    this.lights = new Lights(this);

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer.instance);
    pmremGenerator.compileEquirectangularShader();
    const rgbeLoader = new EXRLoader();
    rgbeLoader.load(resolvePublicPath('/hdr-image.exr'), (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.encoding = THREE.LinearEncoding;

      // 預處理，產生可用的環境貼圖
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;

      // 設定為背景和環境光源
      this.scene.background = envMap;
      this.scene.environment = envMap;

      this.scene.rotateY(Math.PI / 2);

      texture.dispose();
      pmremGenerator.dispose();
    });

    // Resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', (...args) => {
      this.update(...args);
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update(...args) {
    this.camera.update(...args);
    this.world.update(...args);
    this.renderer.update(...args);
  }
}
