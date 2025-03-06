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

    // Renderer setup with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
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
    camera.position.set(5, 3, 5) // Changed initial position for dramatic entry

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

        // Start the initial camera animation
        initialAnimation()
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error)
      }
    )

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.minDistance = 2
    controls.maxDistance = 6
    controls.minPolarAngle = Math.PI / 4
    controls.maxPolarAngle = Math.PI / 2 - 0.1

    // Keyboard controls
    const keyboardControls = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      moveUp: false,
      moveDown: false,
    }

    const onKeyDown = (event) => {
      switch (event.code) {
        case "KeyW":
          keyboardControls.moveForward = true
          break
        case "KeyS":
          keyboardControls.moveBackward = true
          break
        case "KeyA":
          keyboardControls.moveLeft = true
          break
        case "KeyD":
          keyboardControls.moveRight = true
          break
        case "Space":
          keyboardControls.moveUp = true
          break
        case "ShiftLeft":
          keyboardControls.moveDown = true
          break
      }
    }

    const onKeyUp = (event) => {
      switch (event.code) {
        case "KeyW":
          keyboardControls.moveForward = false
          break
        case "KeyS":
          keyboardControls.moveBackward = false
          break
        case "KeyA":
          keyboardControls.moveLeft = false
          break
        case "KeyD":
          keyboardControls.moveRight = false
          break
        case "Space":
          keyboardControls.moveUp = false
          break
        case "ShiftLeft":
          keyboardControls.moveDown = false
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)

    const lanternMixers = []

    // Initial camera animation
    const initialAnimation = () => {
      const duration = 4000 // 4 seconds
      const startTime = Date.now()
      const startPosition = { x: 5, y: 3, z: 5 }
      const endPosition = { x: 2, y: 1, z: 3 }
      const isMobile = /Mobi|Android/i.test(navigator.userAgent)
      if (isMobile) {
        endPosition.x = 0
        endPosition.y = 0.8
        endPosition.z = 3
      }

      //Navigation Bar
      const lanternPositions = [
        { x: -0.1, y: 2.5, z: -6, id: "Login/Register", route: "/login" },
        { x: -2, y: 1.4, z: -1, id: "Events", route: "/events" },
        { x: 2, y: 1.25, z: 1, id: "Teams", route: "/teams" },
        { x: -2, y: 1.9, z: 0, id: "About", route: "/about" },
        { x: 2, y: 1.9, z: 2.5, id: "Sponsors", route: "/sponsors" },
        { x: 2, y: 1.8, z: 0, id: "Developers", route: "/developers" },
        { x: -2, y: 1.6, z: 1, id: "LeaderBoards", route: "/leaderboard" },
        { x: -2, y: 1.5, z: 2.5, id: "Alumini", route: "/signature" },
        { x: 2, y: 1.3, z: -1, id: "Gallery", route: "/gallery" },
      ]

      const lanterns = []

      let lanternMixer
      lanternPositions.forEach((pos) => {
        loader.load(
          "/Lanterns.glb",
          (gltf) => {
            const lantern = gltf.scene
            lantern.position.set(pos.x, pos.y, pos.z)
            lantern.userData.route = pos.route
            scene.add(lantern)
            lanterns.push(lantern)

            lanternMixer = new THREE.AnimationMixer(gltf.scene)
            lanternMixers.push(lanternMixer)
            gltf.animations.forEach((clip) => {
              lanternMixer.clipAction(clip).play()
            })

            // Add hovering effect
            const hoverAnimation = new THREE.AnimationClip("hover", -1, [
              new THREE.VectorKeyframeTrack(".position[y]", [0, 2, 4], [lantern.position.y, lantern.position.y + 0.1, lantern.position.y], THREE.InterpolateSmooth),
            ])
            const hoverAction = lanternMixer.clipAction(hoverAnimation)
            hoverAction.setLoop(THREE.LoopRepeat)
            hoverAction.play()
          },
          undefined,
          (error) => {
            console.error("An error happened while loading the lantern model:", error)
          }
        )
      })

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      // Zoom to the clicked lantern
      window.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(lanterns, true)

        if (intersects.length > 0) {
          let clickedLantern = intersects[0].object
          while (clickedLantern.parent && clickedLantern.parent !== scene) {
            clickedLantern = clickedLantern.parent
          }
          const targetPosition = clickedLantern.position.clone()
          const zoomDuration = 5000
          const zoomStartTime = Date.now()
          const initialCameraPosition = camera.position.clone()

          const zoomAnimate = () => {
            const elapsed = Date.now() - zoomStartTime
            const progress = Math.min(elapsed / zoomDuration, 1)

            const easeProgress = 1 - Math.pow(1 - progress, 3)

            camera.position.lerpVectors(initialCameraPosition, targetPosition, easeProgress)

            if (progress < 0.5) {
              requestAnimationFrame(zoomAnimate)
            } else {
              window.location.href = clickedLantern.userData.route
            }
          }

          zoomAnimate()
        }
      })

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Smooth easing
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        camera.position.x = startPosition.x + (endPosition.x - startPosition.x) * easeProgress
        camera.position.y = startPosition.y + (endPosition.y - startPosition.y) * easeProgress
        camera.position.z = startPosition.z + (endPosition.z - startPosition.z) * easeProgress

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      const delta = clock.getDelta()

      // Update camera position based on keyboard input
      const moveSpeed = 0.1
      if (keyboardControls.moveForward) camera.translateZ(-moveSpeed)
      if (keyboardControls.moveBackward) camera.translateZ(moveSpeed)
      if (keyboardControls.moveLeft) camera.translateX(-moveSpeed)
      if (keyboardControls.moveRight) camera.translateX(moveSpeed)
      if (keyboardControls.moveUp) camera.translateY(moveSpeed)
      if (keyboardControls.moveDown) camera.translateY(-moveSpeed)

      controls.update()
      if (mixer) mixer.update(delta)
      lanternMixers.forEach((lanternMixer) => lanternMixer.update(delta))
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
}

export default Model_2
