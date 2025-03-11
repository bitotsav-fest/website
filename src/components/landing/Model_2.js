"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { useRouter } from "next/navigation";
import { loadModelFromCacheOrNetwork } from "./cacheModel";

const Model_2 = ({ onLoad }) => {
  // Register the service worker inside the component
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("SW registered"))
        .catch((e) => console.error("SW failed:", e));
    }
  }, []);

  const mountRef = useRef(null);
  const router = useRouter();
  const modelRef = useRef(null); // Keep a reference to the loaded model

  let isModel = false;
  let isStalls = false;

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.classList.add("canvas-style-1");
    mountRef.current.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 5);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xdddddd, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // HDRI environment
    new RGBELoader().load("/pretoria_gardens_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
    });

    // Load the main model using CacheStorage
    let mixer;
    loadModelFromCacheOrNetwork("/BIT-v1.glb", (gltf) => {
      modelRef.current = gltf; // Keep the reference to avoid GC on iOS
      scene.add(gltf.scene);
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      if (onLoad) {
        isModel = true;
      }
      if (isModel && isStalls) {
        onLoad();
        initialAnimation();
      }
    });

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 4;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.target.set(0, 0.15, 0);
    controls.update();

    // Initial camera animation
    const initialAnimation = () => {
      const duration = 4000; // 4 seconds
      const startTime = Date.now();
      const startPosition = { x: 5, y: 3, z: 5 };
      const endPosition = { x: 0.7, y: 1, z: 3 };
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      if (isMobile) {
        endPosition.x = 0;
        endPosition.y = 0.8;
        endPosition.z = 5;
        controls.minDistance = 2;
        controls.maxDistance = 4;
        controls.update();
      }
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        camera.position.x =
          startPosition.x + (endPosition.x - startPosition.x) * easeProgress;
        camera.position.y =
          startPosition.y + (endPosition.y - startPosition.y) * easeProgress;
        camera.position.z =
          startPosition.z + (endPosition.z - startPosition.z) * easeProgress;
        if (progress < 1) {
          controls.enabled = false;
          requestAnimationFrame(animate);
        } else {
          controls.enabled = true;
        }
      };
      animate();
    };

    // Render loop
    const clock = new THREE.Clock();
    const renderLoop = () => {
      const delta = clock.getDelta();
      controls.update();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
      requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // Stall handling (navigation, text, etc.)
    const StallPos = [
      { x: 0, y: 0, z: -3.5, Y: Math.PI, id: "LOGIN", route: "/login" },
      { x: -1.7, y: 0, z: -2.5, Y: Math.PI / -2, id: "EVENTS", route: "/events" },
      { x: -1.7, y: 0, z: -0.8, Y: Math.PI / -2, id: "ABOUT", route: "/about" },
      { x: -1.7, y: 0, z: 0.9, Y: Math.PI / -2, id: "DEVELOPERS", route: "/developers" },
      { x: 1.7, y: 0, z: -2.5, Y: Math.PI / 2, id: "TEAM", route: "/team" },
      { x: 1.7, y: 0, z: -0.8, Y: Math.PI / 2, id: "GALLERY", route: "/gallery" },
      { x: 1.7, y: 0, z: 0.9, Y: Math.PI / 2, id: "SPONSORS", route: "/sponsors" },
    ];

    const Stalls = [];
    const TextMeshes = [];
    const stallLoader = new GLTFLoader();
    const stallDracoLoader = new DRACOLoader();
    stallDracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    stallLoader.setDRACOLoader(stallDracoLoader);
    const fontLoader = new FontLoader();

    StallPos.forEach((stall) => {
      stallLoader.load(
        "/Stall.glb",
        (gltf) => {
          const model = gltf.scene.clone();
          model.position.set(stall.x, stall.y, stall.z);
          model.rotation.y = stall.Y;
          model.userData = {
            originalPosition: model.position.clone(),
            originalRotation: model.rotation.y,
            id: stall.id,
            route: stall.route,
          };
          Stalls.push(model);
          scene.add(model);
          model.traverse((child) => {
            if (child.isMesh) {
              if (child.material.name === "Top") {
                child.material = new THREE.MeshStandardMaterial({ color: 0xffe6a1 });
              } else if (child.material.name === "Table") {
                child.material = new THREE.MeshStandardMaterial({ color: 0x572d00 });
              }
              child.userData = model.userData;
            }
            if (onLoad) {
              isStalls = true;
            }
          });

          fontLoader.load(
            "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
            (font) => {
              const textGeometry = new TextGeometry(stall.id, {
                font: font,
                size: 0.1,
                height: 0.01,
                depth: 0.01,
              });
              textGeometry.center();
              textGeometry.computeBoundingBox();
              const maxWidth = 0.4;
              const textWidth =
                textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
              if (textWidth > maxWidth) {
                const scale = maxWidth / textWidth;
                textGeometry.scale(scale, scale, scale);
              }
              const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
              const text = new THREE.Mesh(textGeometry, textMaterial);
              text.position.set(
                stall.x + (stall.x < 0 ? 0.4 : stall.x > 0 ? -0.4 : -0.05),
                stall.y + 0.08,
                stall.z + (stall.x === 0 ? 0.4 : stall.x < 0 ? 0.05 : -0.05)
              );
              text.rotation.y = stall.Y * (stall.id === "LOGIN" ? 0 : -1);
              text.userData = model.userData;
              TextMeshes.push(text);
              scene.add(text);
            },
            undefined,
            (error) => {
              console.error("Error loading stall text:", error);
            }
          );

          // Add stall mouse interaction
          const stallRaycaster = new THREE.Raycaster();
          const stallMouse = new THREE.Vector2();
          const onMouseMove = (event) => {
            stallMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            stallMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            stallRaycaster.setFromCamera(stallMouse, camera);
            const intersects = stallRaycaster.intersectObjects([...Stalls, ...TextMeshes], true);
            renderer.domElement.style.cursor = intersects.length > 0 ? "pointer" : "default";
          };
          const onMouseClick = (event) => {
            stallMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            stallMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            stallRaycaster.setFromCamera(stallMouse, camera);
            const intersects = stallRaycaster.intersectObjects([...Stalls, ...TextMeshes], true);
            if (intersects.length > 0) {
              let intersected = intersects[0].object;
              while (intersected.parent && !intersected.userData.id) {
                intersected = intersected.parent;
              }
              zoomToStall(intersected);
            }
          };

          const zoomToStall = (object) => {
            controls.minDistance = 0;
            controls.maxDistance = 6;
            controls.minPolarAngle = 0;
            const duration = 2000;
            const startTime = Date.now();
            const startPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
            const endPosition = {
              x:
                object.userData.originalPosition.x +
                (object.userData.originalPosition.x < 0
                  ? 1
                  : object.userData.originalPosition.x > 0
                  ? -1
                  : 0),
              y: object.userData.originalPosition.y + 0.3,
              z:
                object.userData.originalPosition.z +
                (object.userData.originalPosition.x === 0
                  ? 1
                  : object.userData.originalPosition.x < 0
                  ? 0.15
                  : -0.15),
            };
            const animateZoom = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              controls.target.set(
                object.userData.originalPosition.x,
                object.userData.originalPosition.y,
                object.userData.originalPosition.z
              );
              controls.update();
              camera.position.x = startPosition.x + (endPosition.x - startPosition.x) * easeProgress;
              camera.position.y = startPosition.y + (endPosition.y - startPosition.y) * easeProgress;
              camera.position.z = startPosition.z + (endPosition.z - startPosition.z) * easeProgress;
              if (progress < 1) {
                controls.enabled = false;
                requestAnimationFrame(animateZoom);
              } else {
                window.location.href = object.userData.route;
              }
            };
            animateZoom();
          };

          window.addEventListener("click", onMouseClick);
          window.addEventListener("mousemove", onMouseMove);
        },
        undefined,
        (error) => {
          console.error("Error loading stall model:", error);
        }
      );
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (modelRef.current) {
        modelRef.current.scene.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else if (child.material) {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Model_2;

