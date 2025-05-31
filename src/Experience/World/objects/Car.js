import * as THREE from 'three';

export class Car {
  constructor(experience, options = {}) {
    this.experience = experience;
    this.scene = experience.scene;
    this.color = options.color || 0xff0000;
    this.position = options.position || new THREE.Vector3(0, 0, 0);
    this.polygonOffsetEnabled = options.polygonOffsetEnabled || false;

    this.setGroup();
    this.createBody();
    this.createRoof();
    this.createWheels();
    this.createHeadlights();
    this.createWindshield();
    this.createLogo();
  }

  setGroup() {
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.scene.add(this.group);
  }

  createBody() {
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: this.color,
      shininess: 100
    });
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.body.position.y = 0;
    this.body.castShadow = true;
    this.group.add(this.body);
  }

  createRoof() {
    const roofGeometry = new THREE.BoxGeometry(1.8, 0.5, 2);
    const roofMaterial = new THREE.MeshPhongMaterial({
      color: this.color,
      shininess: 100
    });
    this.roof = new THREE.Mesh(roofGeometry, roofMaterial);
    this.roof.position.y = 0.5;
    this.roof.position.z = -0.3;
    this.roof.castShadow = true;
    this.group.add(this.roof);
  }

  createWheels() {
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      shininess: 30
    });

    // 前輪
    const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontLeftWheel.rotation.z = Math.PI / 2;
    frontLeftWheel.position.set(-1.1, -0.1, 1.2);
    frontLeftWheel.castShadow = true;
    this.group.add(frontLeftWheel);

    const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontRightWheel.rotation.z = Math.PI / 2;
    frontRightWheel.position.set(1.1, -0.1, 1.2);
    frontRightWheel.castShadow = true;
    this.group.add(frontRightWheel);

    // 後輪
    const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearLeftWheel.rotation.z = Math.PI / 2;
    rearLeftWheel.position.set(-1.1, -0.1, -1.2);
    rearLeftWheel.castShadow = true;
    this.group.add(rearLeftWheel);

    const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearRightWheel.rotation.z = Math.PI / 2;
    rearRightWheel.position.set(1.1, -0.1, -1.2);
    rearRightWheel.castShadow = true;
    this.group.add(rearRightWheel);
  }

  createHeadlights() {
    const headlightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const headlightMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffcc,
      emissive: 0xffffcc,
      emissiveIntensity: 0.5
    });

    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-0.7, 0, 2);
    leftHeadlight.scale.z = 0.3;
    this.group.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(0.7, 0, 2);
    rightHeadlight.scale.z = 0.3;
    this.group.add(rightHeadlight);
  }

  createWindshield() {
    const windshieldGeometry = new THREE.PlaneGeometry(1.7, 0.8);
    const windshieldMaterial = new THREE.MeshPhongMaterial({
      color: 0xaaddff,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial);
    windshield.position.set(0, 0.5, 0.7);
    windshield.rotation.x = Math.PI / 4;
    this.group.add(windshield);
  }

  createLogo() {
    const loader = new THREE.TextureLoader();
    loader.load('/logo.png', (texture) => {
      const logoGeometry = new THREE.CircleGeometry(0.3, 32);
      const logoMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        shininess: 100,
        side: THREE.DoubleSide,
        color: 'pink'
      });

      if (this.polygonOffsetEnabled) {
        logoMaterial.polygonOffset = true;
        logoMaterial.polygonOffsetFactor = -0.1;
        logoMaterial.polygonOffsetUnits = -1;
      }

      this.experience.debug.gui.add(logoMaterial, 'polygonOffset');
      this.experience.debug.gui
        .add(logoMaterial, 'polygonOffsetFactor')
        .min(-1)
        .max(1)
        .step(0.1);
      this.experience.debug.gui
        .add(logoMaterial, 'polygonOffsetUnits')
        .min(-20)
        .max(20)
        .step(1);

      this.logo = new THREE.Mesh(logoGeometry, logoMaterial);
      this.logo.position.z = 2;

      this.body.add(this.logo);
    });
  }

  update() {}
}
