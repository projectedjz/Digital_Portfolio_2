import './AboutSection.css'

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="terminal-command">
          <span className="prompt">&gt;_</span>
          <span className="command">$ cat sections/about_me.txt</span>
        </div>

        <div className="section-title">
          <h2>&gt;&gt; ABOUT_ME</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-card">
          <div className="about-photo">
            <img src="/path-to-your-photo.jpg" alt="Ong Jun Zhen" />
          </div>

          <div className="about-info">
            <div className="info-header">
              <span className="user-icon">👤</span>
              <h3>Ong Jun Zhen</h3>
            </div>

            <p className="info-subtitle">NYP Year 2 | Diploma in Information Technology</p>

            <div className="description-section">
              <div className="description-label">
                <span>&gt;</span> Description:
              </div>
              <div className="description-content">
                <p className="placeholder">[PLACEHOLDER - Add your description here]</p>
              </div>
            </div>

            <div className="info-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">Ong Jun Zhen</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">Student @ NYP</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Year:</span>
                <span className="detail-value">Year 2</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Program:</span>
                <span className="detail-value">Diploma in Information Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
