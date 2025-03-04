"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const Model_2 = ({ onLoad }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 1, 15)

    // Renderer setup with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.domElement.classList.add("canvas-style-1")
    mountRef.current.appendChild(renderer.domElement)

    // Camera setup with better initial position
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(2, 1, 3)
    camera.lookAt(0, 0, 0)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500
    scene.add(directionalLight)

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, 2)
    scene.add(hemisphereLight)

    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
    loader.setDRACOLoader(dracoLoader)

    let mixer
    loader.load(
      "/BIT-v1.glb",
      (gltf) => {
        scene.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play()
        })
        onLoad && onLoad()
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error)
      }
    )

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.enableZoom = true
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.minPolarAngle = Math.PI / 3
    controls.maxPolarAngle = Math.PI / 2 - 0.1

    // Initial camera animation
    const initialAnimation = () => {
      const duration = 4000 // 4 seconds
      const startTime = Date.now()
      const startPosition = { x: 5, y: 3, z: 5 }
      const endPosition = { x: 2, y: 1, z: 3 }

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Smooth easing
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        camera.position.x = startPosition.x + (endPosition.x - startPosition.x) * easeProgress
        camera.position.y = startPosition.y + (endPosition.y - startPosition.y) * easeProgress
        camera.position.z = startPosition.z + (endPosition.z - startPosition.z) * easeProgress

        camera.lookAt(0, 0, 0)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }

    initialAnimation()

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const delta = clock.getDelta()
      if (mixer) mixer.update(delta)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={mountRef}></div>
}

export default Model_2
