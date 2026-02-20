import './Section.css'

export default function ContactSection() {
  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="section-container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Let's create something amazing together</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <p>I'm always interested in hearing about new projects and opportunities.</p>
            <div className="contact-links">
              <a href="mailto:hello@example.com" className="contact-link">
                Email
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
