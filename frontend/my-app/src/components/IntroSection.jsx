import { useRef, useEffect, useState } from 'react'
import './IntroSection.css'

export default function IntroSection() {
  const terminalRef = useRef(null)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const fullText = "Welcome to Ong Jun Zhen's Portfolio"

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTyping) {
            setIsTyping(true)
            let currentIndex = 0
            
            const typingInterval = setInterval(() => {
              if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex))
                currentIndex++
              } else {
                clearInterval(typingInterval)
              }
            }, 50) // Typing speed in ms per character

            return () => clearInterval(typingInterval)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (terminalRef.current) {
      observer.observe(terminalRef.current)
    }

    return () => {
      if (terminalRef.current) {
        observer.unobserve(terminalRef.current)
      }
    }
  }, [isTyping])

  const navItems = [
    { name: 'about.sh', href: '#about' },
    { name: 'projects.sh', href: '#projects' },
    { name: 'certifications.sh', href: '#certifications' },
    { name: 'skills.sh', href: '#skills' },
    { name: 'hobbies.sh', href: '#hobbies' },
    { name: 'contact.sh', href: '#contact' },
  ]

  return (
    <section id="intro" className="intro-section">
      <div className="terminal-container" ref={terminalRef}>
        <div className="terminal-body">
          <div className="terminal-prompt">
            <span className="prompt-symbol">&gt;_</span>
            <span className="prompt-text">user@portfolio:~$</span>
          </div>

          <div className="profile-section">
            <div className="profile-info">
              <h1 className="terminal-title-main">
                <span className="symbol">$</span> {displayedText}<span className="cursor">|</span>
              </h1>
              
              <div className="terminal-prompt secondary">
                <span className="prompt-symbol">&gt;&gt;</span>
                <span className="prompt-text">Student At Nanyang Polytechnic</span>
              </div>
            </div>
          </div>

          <div className="nav-scripts">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="script-link"
              >
                <span className="script-icon">&gt;</span>
                <span className="script-name">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
