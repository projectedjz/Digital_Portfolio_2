import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar({ hasEntered }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(hasEntered)
  }, [hasEntered])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${isVisible ? 'visible' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">Portfolio</div>
        <ul className="navbar-menu">
          <li>
            <button onClick={() => scrollToSection('projects')}>
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('certifications')}>
              Certifications
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('hobbies')}>
              Hobbies
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
