import { get, set } from "idb-keyval"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

async function loadModelFromCacheOrNetwork(url, onLoad) {
  const cache = await caches.open("models-cache")
  const cachedResponse = await cache.match(url)

  if (cachedResponse) {
    console.log("Loaded model from cache")
    const blob = await cachedResponse.blob()
    const objectURL = URL.createObjectURL(blob)
    loadModel(objectURL, onLoad)
  } else {
    console.log("Fetching model from network")
    await fetchAndCacheModel(url, onLoad)
  }
}

async function fetchAndCacheModel(url, onLoad) {
  const response = await fetch(url)
  const clone = response.clone() // Clone response before reading it
  const cache = await caches.open("models-cache")
  await cache.put(url, clone)

  const blob = await response.blob()
  const objectURL = URL.createObjectURL(blob)
  loadModel(objectURL, onLoad)
}

function loadModel(url, onLoad) {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
  loader.setDRACOLoader(dracoLoader)

  loader.load(url, (gltf) => {
    onLoad(gltf)
  })
}

export { loadModelFromCacheOrNetwork }
