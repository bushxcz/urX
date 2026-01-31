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
        <footer className="border-t border-border-subtle py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-obsidian rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
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
