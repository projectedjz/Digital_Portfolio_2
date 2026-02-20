import { useRef, Suspense, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload the model
useGLTF.preload('/models/scene.gltf')

function DesktopModelInner({ onBounds }) {
  const groupRef = useRef()
  
  // Load the local glTF model
  const { scene } = useGLTF('/models/scene.gltf')

  // Ensure the loaded scene is properly set up with shadows
  if (scene) {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          child.geometry.computeBoundingBox()
          const meshBox = child.geometry.boundingBox
          if (meshBox) {
            const meshSize = new THREE.Vector3()
            meshBox.getSize(meshSize)
            if (meshSize.x > 200 || meshSize.y > 200 || meshSize.z > 200) {
              child.visible = false
            }
          }
        }
        if (child.material && child.material.name === 'Background') {
          child.visible = false
        }
        if (child.name && child.name.toLowerCase().includes('background')) {
          child.visible = false
        }
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  useLayoutEffect(() => {
    if (!scene || !groupRef.current) return

    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // Normalize size so the model fits nicely in the hero view
    const targetHeight = 40.0

    const scale = targetHeight / (size.y || 1)
    const scaleBoost = 4

    scene.position.sub(center)
    groupRef.current.scale.setScalar(scale * scaleBoost)
    groupRef.current.position.set(0, -0.2, 0)
    groupRef.current.rotation.set(0, 0, 0)

    groupRef.current.updateWorldMatrix(true, true)
    const worldBox = new THREE.Box3().setFromObject(groupRef.current)
    const worldSize = worldBox.getSize(new THREE.Vector3())
    const worldCenter = worldBox.getCenter(new THREE.Vector3())

    if (onBounds) {
      onBounds({ size: worldSize, center: worldCenter })
    }
  }, [scene])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

export default function DesktopModel({ onBounds }) {
  return (
    <Suspense fallback={null}>
      <DesktopModelInner onBounds={onBounds} />
    </Suspense>
  )
}
