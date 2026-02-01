import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';
import TechnicalGrid from './components/TechnicalGrid';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Dashboard from './sections/Dashboard';
import CycleTracker from './sections/CycleTracker';
import CycleAnalytics from './sections/CycleAnalytics';
import Login from './pages/Login';

function AppContent() {
  const { user, loading } = useAuth();
  const [cycles, setCycles] = useState([]);
  const [loadingCycles, setLoadingCycles] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingCycle, setPendingCycle] = useState(null);

  // Fetch user's cycles from Supabase on login
  useEffect(() => {
    if (user) {
      fetchCycles();
      // If there was a pending cycle to save, save it now
      if (pendingCycle) {
        saveCycleToDatabase(pendingCycle);
        setPendingCycle(null);
      }
    }
  }, [user]);

  const fetchCycles = async () => {
    setLoadingCycles(true);
    try {
      const { data, error } = await supabase
        .from('cycles')
        .select('*')
        .eq('user_id', user.id)
        .order('date_start', { ascending: true });

      if (error) throw error;

      // Transform data to match our component format
      const transformedCycles = data.map(cycle => ({
        id: cycle.id,
        dateStart: cycle.date_start,
        dateEnd: cycle.date_end,
        impressions: cycle.impressions,
        revenue: cycle.revenue,
        engagement: cycle.engagement,
        saved: true, // Mark as saved to DB
      }));

      setCycles(transformedCycles);
    } catch (error) {
      console.error('Error fetching cycles:', error);
    } finally {
      setLoadingCycles(false);
    }
  };

  const saveCycleToDatabase = async (cycleData) => {
    try {
      const { data, error } = await supabase
        .from('cycles')
        .insert({
          user_id: user.id,
          date_start: cycleData.dateStart,
          date_end: cycleData.dateEnd,
          impressions: cycleData.impressions,
          revenue: cycleData.revenue,
          engagement: cycleData.engagement,
        })
        .select()
        .single();

      if (error) throw error;

      // Update cycle in local state with DB id and saved flag
      setCycles(prev => prev.map(c =>
        c.id === cycleData.id
          ? { ...c, id: data.id, saved: true }
          : c
      ));
    } catch (error) {
      console.error('Error saving cycle:', error);
    }
  };

  const handleAddCycle = async (cycleData) => {
    // Create local cycle with temporary ID
    const newCycle = {
      ...cycleData,
      id: `temp-${Date.now()}`,
      saved: false, // Not yet saved to DB
    };

    // Add to local state immediately (guest mode works)
    setCycles(prev => [...prev, newCycle]);

    // Scroll to analytics
    setTimeout(() => {
      document.getElementById('cycle-analytics')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // If user is logged in, save to database
    if (user) {
      try {
        const { data, error } = await supabase
          .from('cycles')
          .insert({
            user_id: user.id,
            date_start: cycleData.dateStart,
            date_end: cycleData.dateEnd,
            impressions: cycleData.impressions,
            revenue: cycleData.revenue,
            engagement: cycleData.engagement,
          })
          .select()
          .single();

        if (error) throw error;

        // Update with real DB id
        setCycles(prev => prev.map(c =>
          c.id === newCycle.id
            ? { ...c, id: data.id, saved: true }
            : c
        ));
      } catch (error) {
        console.error('Error saving cycle:', error);
      }
    }
  };

  const handleDeleteCycle = async (cycleId) => {
    // Remove from local state immediately
    setCycles(prev => prev.filter(c => c.id !== cycleId));

    // If user is logged in and it's a saved cycle, delete from DB
    if (user && !String(cycleId).startsWith('temp-')) {
      try {
        const { error } = await supabase
          .from('cycles')
          .delete()
          .eq('id', cycleId);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting cycle:', error);
      }
    }
  };

  const handleSaveData = () => {
    if (!user) {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // The useEffect will handle fetching/syncing data
  };

  // Show loading state only on initial auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-obsidian/20 border-t-obsidian rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-subtle">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-canvas">
        {/* Technical Grid Background */}
        <TechnicalGrid />

        {/* Navigation */}
        <Navbar onSaveClick={handleSaveData} />

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />

          {/* Dashboard shows lifetime stats from cycles */}
          <Dashboard cycles={cycles} />

          {/* Multi-Cycle Payout Analysis */}
          <CycleTracker
            cycles={cycles}
            onAddCycle={handleAddCycle}
            onDeleteCycle={handleDeleteCycle}
            loading={loadingCycles}
            isGuest={!user}
            onSavePrompt={handleSaveData}
          />
          <CycleAnalytics cycles={cycles} />

          {/* Save Prompt for Guest Users */}
          {!user && cycles.length > 0 && (
            <div className="max-w-5xl mx-auto px-4 md:px-6 pb-8">
              <div className="bg-gradient-to-r from-obsidian to-obsidian/90 rounded-2xl p-6 md:p-8 text-center">
                <p className="text-white/80 text-lg mb-4">
                  You have <span className="text-emerald-accent font-semibold">{cycles.length} unsaved cycle{cycles.length > 1 ? 's' : ''}</span>.
                  Sign in to save your data permanently.
                </p>
                <button
                  onClick={handleSaveData}
                  className="bg-white text-obsidian px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Sign In to Save
                </button>
              </div>
            </div>
          )}

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

              <div className="flex items-center gap-6">
                {/* Social Links */}
                <a
                  href="https://x.com/bushrahhhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtle hover:text-obsidian transition-colors"
                  title="Follow us on X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/bushra-maheen-3x01a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtle hover:text-obsidian transition-colors"
                  title="Connect on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Text Links */}
                <a href="#" className="text-subtle hover:text-obsidian text-sm transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-subtle hover:text-obsidian text-sm transition-colors">
                  Terms
                </a>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border-subtle/50 text-center">
              <p className="text-subtle/70 text-xs">
                Crafted with <span className="text-red-400">♥</span> by{' '}
                <a
                  href="https://x.com/bushrahhhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-obsidian/70 hover:text-obsidian font-medium transition-colors"
                >
                  Bushra
                </a>
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors"
            >
              ✕ Close
            </button>
            <Login onSuccess={handleLoginSuccess} isModal />
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
