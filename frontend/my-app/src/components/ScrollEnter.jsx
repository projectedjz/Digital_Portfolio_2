import { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function useScrollEnter() {
  const [hasEntered, setHasEntered] = useState(false)
  const cameraRef = useRef()
  const { camera } = useThree()

  useGSAP(
    () => {
      // Get the camera reference from the three context
      // This is called after the scene mounts
      if (!camera) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
          onUpdate: (self) => {
            // Progress from 0 to 1 as user scrolls
            const progress = self.progress

            // Starting position: outside/around the monitor (isometric view)
            const startPos = [4, 2, 5]
            // End position: inside the screen, zoomed in
            const endPos = [0, 0, 0.5]
            // Look-at target: center of screen
            const targetPos = [0, 0, -0.1]

            // Interpolate camera position
            camera.position.lerpVectors(
              new THREE.Vector3(...startPos),
              new THREE.Vector3(...endPos),
              progress
            )

            // Interpolate look-at (smooth pan toward center)
            const lookTarget = new THREE.Vector3(...targetPos)
            const lookStart = new THREE.Vector3(0, 0, 2)
            lookTarget.lerpVectors(lookStart, lookTarget, progress)
            camera.lookAt(lookTarget)
          },
          onComplete: () => {
            setHasEntered(true)
          },
        },
      })

      // Fade overlay during transition
      tl.to('.scroll-enter-overlay', {
        opacity: 1,
        duration: 0.5,
      }, 0)

      return () => {
        // Cleanup is automatic with useGSAP
      }
    },
    { dependencies: [camera], scope: null }
  )

  return { hasEntered }
}

export default function ScrollEnter({ children }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
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
      if (reducedMotion) {
        // Skip animations on reduced motion
        gsap.set('.scroll-enter-overlay', { opacity: 0, pointerEvents: 'none' })
        gsap.set('.hero-wrapper', { clearProps: 'all' })
        setShowContent(true)
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
          onComplete: () => {
            setShowContent(true)
          },
        },
      })

      tl.to('.scroll-enter-overlay', {
        opacity: 1,
        duration: 0.8,
      })

      // Content fade in after entering
      tl.to(
        '.portfolio-content',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '>-0.3'
      )
    },
    { dependencies: [reducedMotion] }
  )

  return (
    <>
      <div className="scroll-enter-overlay"></div>
      <div className={`portfolio-content ${showContent ? 'visible' : ''}`}>
        {children}
      </div>
    </>
  )
}
