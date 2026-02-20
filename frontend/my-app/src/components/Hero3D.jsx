import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Lights } from '@react-three/drei'
import DesktopModel from './DesktopModel'
import * as THREE from 'three'

function SceneContent() {
  const controlsRef = useRef()
  const cameraRef = useRef()

  useEffect(() => {
    if (controlsRef.current) {
      // Disable zoom and pan - only allow rotation
      controlsRef.current.enableZoom = false
      controlsRef.current.enablePan = false

      // Clamp polar angle to prevent flipping
      controlsRef.current.minPolarAngle = Math.PI * 0.35
      controlsRef.current.maxPolarAngle = Math.PI * 0.65

      // Set initial auto-rotation for visual interest
      controlsRef.current.autoRotate = true
      controlsRef.current.autoRotateSpeed = 2
    }
  }, [controlsRef])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[4, 2, 5]}
        fov={50}
        near={0.1}
        far={100}
      />

      {/* Studio lighting setup */}
      <ambientLight intensity={0.5} color="#ffffff" />

      {/* Key light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#ffffff"
      />

      {/* Fill light */}
      <directionalLight
        position={[-4, 4, -6]}
        intensity={0.4}
        color="#e8e4d9"
      />

      {/* Subtle rim/back light */}
      <pointLight position={[0, 3, -8]} intensity={0.3} color="#c4b5fd" />

      <DesktopModel />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.65}
        autoRotate={true}
        autoRotateSpeed={2}
      />

      {/* Optional: grid or background plane for context */}
      <mesh position={[0, -1.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#f5f3f0"
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </>
  )
}

export default function Hero3D({ onModelReady }) {
  useEffect(() => {
    if (onModelReady) onModelReady()
  }, [onModelReady])

  return (
    <div className="hero-3d-container">
      <Canvas shadows>
        <SceneContent />
      </Canvas>
    </div>
  )
}
