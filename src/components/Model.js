"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const Model = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()

    let camera
    if (window.innerWidth > 768) {
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 0.5, 0)
    } else {
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight / 2.25), 0.1, 1000)
      camera.position.set(0, 0.8, 0)
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const loader = new GLTFLoader()
    let model
    let originalMaterial
    let goldMaterial
    loader.load("/Lsvg.glb", (gltf) => {
      model = gltf.scene
      scene.add(model)

      model.traverse((child) => {
        if (child.isMesh && child.name === "70") {
          originalMaterial = child.material
        }
        if (child.isMesh && child.material.name === "Gold") {
          goldMaterial = child.material
        }
      })
    })

    const light = new THREE.AmbientLight(0xffffff, 1)
    const dicLight = new THREE.DirectionalLight(0xffffff, 1)
    dicLight.position.set(0, 1, -2)
    scene.add(light, dicLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableRotate = false
    controls.enableZoom = false

    let targetRotationX = 0
    let targetRotationY = 0

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseHover = (event) => {
      if (!model) return

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(model.children, true)

      if (intersects.length > 0) {
        if (intersects[0].object.name === "70") {
          intersects[0].object.material = goldMaterial
        }
      } else {
        model.traverse((child) => {
          if (child.isMesh && child.name === "70") {
            child.material = originalMaterial
          }
        })
      }
    }

    const onMouseMove = (event) => {
      if (!model) return

      var mouseX = (event.clientX / window.innerWidth - 0.5) * 2
      var mouseY = -(event.clientY / window.innerHeight - 0.5) * 2

      var xsing = Math.sign(mouseX)
      var ysing = Math.sign(mouseY)

      if (xsing == ysing) {
        if (xsing == 1 && ysing == 1) {
          mouseX = mouseX * xsing * -1
          mouseY = mouseY * ysing * -1
        } else {
          mouseX = mouseX * xsing
          mouseY = mouseY * ysing
        }
      } else {
        if (xsing == -1) {
          mouseX = mouseX * xsing
          mouseY = mouseY * xsing
        } else {
          mouseX = mouseX * ysing
          mouseY = mouseY * ysing
        }
      }

      const maxRotation = Math.PI / 16
      targetRotationY = mouseY * maxRotation
      targetRotationX = mouseX * maxRotation
    }

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      if (model) {
        model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, targetRotationY, 0.1)
        model.rotation.z = THREE.MathUtils.lerp(model.rotation.z, targetRotationX, 0.1)
      }

      renderer.render(scene, camera)
    }

    animate()
    window.addEventListener("mousemove", onMouseHover)

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", onMouseMove)
    }

    let hoverAnimationId
    const hover = () => {
      if (model) {
        model.position.z = Math.sin(Date.now() * 0.002) * 0.05
      }
      hoverAnimationId = requestAnimationFrame(hover)
    }
    hover()

    return () => {
      if (window.innerWidth > 768) {
        window.removeEventListener("mousemove", onMouseMove)
        cancelAnimationFrame(hoverAnimationId)

        return () => {
          cancelAnimationFrame(hoverAnimationId)
          if (window.innerWidth > 768) {
            window.removeEventListener("mousemove", onMouseMove)
            cancelAnimationFrame(hoverAnimationId)
          }
          mountRef.current.removeChild(renderer.domElement)
        }
      }
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} />
}

export default Model
