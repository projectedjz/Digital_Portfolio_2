import { useState } from 'react'
import './App.css'
import Hero from './views/Hero'
import IntroSection from './components/IntroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import CertificationsSection from './components/CertificationsSection'
import HobbiesSection from './components/HobbiesSection'
import ContactSection from './components/ContactSection'

function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className={`app ${hasEntered ? 'entered' : ''}`}>
      <Hero onEnter={setHasEntered} />
      <div className={`sections-wrapper ${hasEntered ? 'entered' : ''}`}>
        <div className="cmd-frame">
          <div className="cmd-title-bar">
            <span className="cmd-title">Command Prompt - Ong Jun Zhen Portfolio</span>
          </div>
          <div className="cmd-content">
            <IntroSection />
            <AboutSection />
            <ProjectsSection />
            <CertificationsSection />
            <HobbiesSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
