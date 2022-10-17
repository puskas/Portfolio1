import * as THREE from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui'

class App {
  constructor() {
    this.mouseX = 0
    this.mouseY = 0

    this.targetX = 0
    this.targetY = 0

    const gui = new dat.GUI()

    this.clock = new THREE.Clock();

    this.loadNormalMap()

    const canvas = document.querySelector('canvas.webgl');

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 2);

    this.scene = new THREE.Scene();

    this.pointLight1 = new THREE.PointLight(0xffffff, 0.1)
    this.pointLight1.position.set(2, 3, 4)
    this.scene.add(this.pointLight1)

    this.pointLight2 = new THREE.PointLight(0xff0000, 2)
    this.pointLight2.position.set(-1.86, 1, -1.65)
    this.pointLight2.intensity = 4.6
    this.scene.add(this.pointLight2)
    const light2 = gui.addFolder('Light2')
    light2.add(this.pointLight2.position, 'x').min(-6).max(6).step(0.01)
    light2.add(this.pointLight2.position, 'y').min(-3).max(3).step(0.01)
    light2.add(this.pointLight2.position, 'z').min(-3).max(3).step(0.01)
    light2.add(this.pointLight2, 'intensity').min(0).max(10).step(0.1)
    const light2Color = {
      color: 0xff0000
    }
    light2.addColor(light2Color, 'color')
      .onChange(() => {
        this.pointLight2.color.set(light2Color.color)
      })

    const pointLightHelper = new THREE.PointLightHelper(this.pointLight2, 1)
    this.scene.add(pointLightHelper)

    this.pointLight3 = new THREE.PointLight(0xe1ff, 2)
    this.pointLight3.position.set(2.13, -3, -1.98)
    this.pointLight3.intensity = 6.8
    this.scene.add(this.pointLight3)

    const geometry = new THREE.SphereGeometry(.5, 64, 64)
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.normalMap = this.normalTexture
    material.color = new THREE.Color(0x292929)

    this.sphere = new THREE.Mesh(geometry, material);

    this.scene.add(this.sphere);

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    //const controls = new OrbitControls(this.camera, this.renderer.domElement);


    const windowX = window.innerWidth / 2
    const windowY = window.innerHeight / 2

    const onDocumentMouseMove = (event) => {
      this.mouseX = (event.clientX - windowX)
      this.mouseY = (event.clientY - windowY)
    }
    document.addEventListener('mousemove', onDocumentMouseMove)

    const updateSphere = (event) => {
      this.sphere.position.y = window.scrollY * -.001
    }
    window.addEventListener('scroll', updateSphere)

    this.renderer.setAnimationLoop(this.render.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  loadNormalMap() {
    const textureLoader = new THREE.TextureLoader()
    this.normalTexture = textureLoader.load('/textures/NormalMap.png')
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  render() {
    this.targetX = this.mouseX * .001
    this.targetY = this.mouseY * .001
    const elapsedTime = this.clock.getElapsedTime()
    this.sphere.rotation.y = .5 * elapsedTime
    this.sphere.rotation.x += .05 * (this.targetY - this.sphere.rotation.x)
    this.sphere.rotation.y += .5 * (this.targetX - this.sphere.rotation.y)
    this.sphere.position.z += -.05 * (this.targetY - this.sphere.rotation.x)
    this.renderer.render(this.scene, this.camera);
  }
}

export {
  App
};