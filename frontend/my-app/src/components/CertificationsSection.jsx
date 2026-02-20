import './Section.css'

export default function CertificationsSection() {
  return (
    <section id="certifications" className="portfolio-section">
      <div className="section-container">
        <h2>Certifications</h2>
        <p className="section-subtitle">Professional development and ongoing learning</p>
        
        <div className="certifications-list">
          {[
            'Advanced React Patterns',
            'Three.js & WebGL Mastery',
            'Web Performance Optimization',
            'UI/UX Design Principles',
          ].map((cert, i) => (
            <div key={i} className="certification-item">
              <div className="cert-icon">✓</div>
              <div>
                <h4>{cert}</h4>
                <p>2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
