import * as THREE from 'three';

export class Lights {
  constructor(experience) {
    const { scene } = experience;

    // 添加環境光源
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // 添加方向光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // 添加點光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);
  }
}
