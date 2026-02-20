import './Section.css'

export default function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section">
      <div className="section-container">
        <h2>Projects</h2>
        <p className="section-subtitle">Featured work and experiments</p>
        
        <div className="projects-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="project-card">
              <div className="project-header">
                <h3>Project {i}</h3>
              </div>
              <p>A creative project showcasing modern web techniques and design thinking.</p>
              <div className="project-tags">
                <span>React</span>
                <span>3D Graphics</span>
                <span>Animation</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
