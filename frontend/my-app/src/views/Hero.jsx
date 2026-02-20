import { useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import DesktopModel from '../components/DesktopModel'
import '../styles/Hero.css'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function SceneContent({ onSceneReady, modelBounds }) {
  const controlsRef = useRef()
  const cameraRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = false
      controlsRef.current.enablePan = false
      controlsRef.current.minPolarAngle = Math.PI * 0.35
      controlsRef.current.maxPolarAngle = Math.PI * 0.65
      controlsRef.current.autoRotate = false
      controlsRef.current.autoRotateSpeed = 0
      if (modelBounds?.center) {
        controlsRef.current.target.copy(modelBounds.center)
      } else {
        controlsRef.current.target.set(0, 0.2, 0)
      }
      controlsRef.current.update()
    }

    if (onSceneReady) {
      onSceneReady({ camera, controlsRef })
    }
  }, [camera, onSceneReady, modelBounds])

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 1.0, 6.5]}
        fov={45}
        near={0.1}
        far={100}
      />

      <ambientLight intensity={0.5} color="#ffffff" />

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

      <directionalLight
        position={[-4, 4, -6]}
        intensity={0.4}
        color="#e8e4d9"
      />

      <pointLight position={[0, 3, -8]} intensity={0.3} color="#c4b5fd" />

      <DesktopModel onBounds={onSceneReady}/>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.65}
        autoRotate={false}
        autoRotateSpeed={0}
      />

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

export default function Hero({ onEnter }) {
  const sceneRef = useRef({ camera: null, controlsRef: null })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [modelBounds, setModelBounds] = useState(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e) => {
      setReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useGSAP(
    () => {
      if (!sceneRef.current.camera || !modelBounds?.center) return

      const camera = sceneRef.current.camera
      const controlsRef = sceneRef.current.controlsRef

      if (reducedMotion) {
        // Instant transition for reduced motion
        gsap.set('.hero-overlay', { opacity: 0, pointerEvents: 'none' })
        gsap.set('.hero-wrapper', { clearProps: 'all' })
        onEnter(true)
        setHasScrolled(true)
        return
      }

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-wrapper',
          start: 'top top',
          end: '+=260%',
          scrub: 1.1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            if (self.progress > 0.9) {
              onEnter(true)
            } else if (self.progress < 0.2) {
              onEnter(false)
            }
          },
          onEnter: () => {
            if (controlsRef && controlsRef.current) {
              controlsRef.current.autoRotate = false
            }
          },
          onLeaveBack: () => {
            if (controlsRef && controlsRef.current) {
              controlsRef.current.autoRotate = true
            }
          },
          onComplete: () => {
            onEnter(true)
            setHasScrolled(true)
          },
        },
      })

      const center = modelBounds.center
      const size = modelBounds.size
      const camSize = new THREE.Vector3(
        Math.min(size.x, 4),
        Math.min(size.y, 3),
        Math.min(size.z, 4)
      )

      const startPos = new THREE.Vector3(
        center.x,
        center.y + camSize.y * 0.35,
        center.z + camSize.z * 1.6
      )

      const endPos = new THREE.Vector3(
        center.x,
        center.y + camSize.y * 0.22,
        center.z + camSize.z * 0.35
      )

      // Animate camera moving toward the screen
      tl.to(
        { progress: 0 },
        {
          progress: 1,
          duration: 1,
          onUpdate: function () {
            const progress = this.targets()[0].progress

            camera.position.lerpVectors(startPos, endPos, progress)

            // Look target moves from viewing monitor to inside screen
            const lookStart = new THREE.Vector3(center.x, center.y + camSize.y * 0.26, center.z)
            const lookEnd = new THREE.Vector3(center.x, center.y + camSize.y * 0.26, center.z - camSize.z * 0.6)
            const lookTarget = new THREE.Vector3()
            lookTarget.lerpVectors(lookStart, lookEnd, progress)

            camera.lookAt(lookTarget)
          },
        },
        0
      )

      // Fade to black near the end of the zoom
      tl.to(
        '.hero-overlay',
        {
          opacity: 1,
          duration: 0.6,
        },
        '>-0.2'
      )

      tl.to(
        '.hero-container',
        {
          opacity: 0,
          duration: 0.4,
        },
        '>-0.2'
      )

      tl.to(
        '.hero-overlay',
        {
          opacity: 0,
          duration: 0.6,
        },
        '>-0.1'
      )

      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill()
        }
        tl.kill()
      }
    },
    { dependencies: [reducedMotion, onEnter, modelBounds] }
  )

  const handleSceneReady = (sceneData) => {
    if (sceneData?.camera && sceneData?.controlsRef) {
      sceneRef.current = sceneData
    }
    if (sceneData?.size && sceneData?.center) {
      setModelBounds(sceneData)
    }
  }

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero-container">
          <div className="hero-title">
            <h1>Welcome to my Digital Portfolio</h1>
            <p>Scroll to Enter →</p>
          </div>
          <div className="hero-3d-container">
            <Canvas shadows>
              <SceneContent onSceneReady={handleSceneReady} modelBounds={modelBounds} />
            </Canvas>
          </div>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </>
  )
}
