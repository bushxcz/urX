import { useState } from 'react';
import TechnicalGrid from './components/TechnicalGrid';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Tracker from './sections/Tracker';
import Dashboard from './sections/Dashboard';

function App() {
  const [trackerData, setTrackerData] = useState(null);

  const handleTrackerSubmit = (data) => {
    setTrackerData(data);
    // Scroll to dashboard
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Technical Grid Background */}
      <TechnicalGrid />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Tracker onSubmit={handleTrackerSubmit} />
        <Dashboard data={trackerData} />

        {/* Footer */}
        <footer className="border-t border-border-subtle py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/urx-icon.svg"
                alt="urX Logo"
                className="w-8 h-8"
              />
              <span className="font-sans font-semibold text-obsidian">urX</span>
            </div>

            <p className="text-subtle text-sm">
              © 2026 urX. Revenue traceability for X Creators.
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-subtle hover:text-obsidian text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-subtle hover:text-obsidian text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-subtle hover:text-obsidian text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
