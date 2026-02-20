import './Section.css'

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="portfolio-section">
      <div className="section-container">
        <h2>Hobbies</h2>
        <p className="section-subtitle">Beyond the code</p>
        
        <div className="hobbies-grid">
          {[
            { emoji: '🎮', title: 'Game Dev', desc: 'Exploring interactive storytelling' },
            { emoji: '🎨', title: 'Digital Art', desc: 'Creative expression through pixels' },
            { emoji: '🏔️', title: 'Outdoors', desc: 'Hiking and nature photography' },
            { emoji: '📚', title: 'Reading', desc: 'Sci-fi, philosophy, and tech' },
          ].map((hobby, i) => (
            <div key={i} className="hobby-card">
              <div className="hobby-emoji">{hobby.emoji}</div>
              <h4>{hobby.title}</h4>
              <p>{hobby.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
