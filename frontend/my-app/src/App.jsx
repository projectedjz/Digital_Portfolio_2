import { useState } from 'react'
import './App.css'
import Hero from './views/Hero'
import Navbar from './components/Navbar'
import ProjectsSection from './components/ProjectsSection'
import CertificationsSection from './components/CertificationsSection'
import HobbiesSection from './components/HobbiesSection'
import ContactSection from './components/ContactSection'

function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className={`app ${hasEntered ? 'entered' : ''}`}>
      <Navbar hasEntered={hasEntered} />
      <Hero onEnter={setHasEntered} />
      <div className={`sections-wrapper ${hasEntered ? 'entered' : ''}`}>
        <ProjectsSection />
        <CertificationsSection />
        <HobbiesSection />
        <ContactSection />
      </div>
    </div>
  )
}

export default App
