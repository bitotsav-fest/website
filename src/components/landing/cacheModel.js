import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

async function loadModelFromCacheOrNetwork(url, onLoad) {
  try {
    const cache = await caches.open("models-cache");
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      // Use arrayBuffer directly – NO BLOBS
      const arrayBuffer = await cachedResponse.arrayBuffer();
      loadModelDirectly(arrayBuffer, onLoad);
    } else {
      const response = await fetch(url);
      const clone = response.clone();
      await cache.put(url, clone);
      const arrayBuffer = await response.arrayBuffer();
      loadModelDirectly(arrayBuffer, onLoad);
    }
  } catch (error) {
    console.error("Model load failed:", error);
    // Fallback to direct fetch if necessary
  }
}

function loadModelDirectly(arrayBuffer, onLoad) {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  loader.setDRACOLoader(dracoLoader);

  // Use parse() instead of load()
  loader.parse(
    arrayBuffer,
    "",
    (gltf) => {
      onLoad(gltf);
    },
    (error) => {
      console.error("GLTF parse error:", error);
    }
  );
}

export { loadModelFromCacheOrNetwork };

