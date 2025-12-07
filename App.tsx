import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ProjectsPage from './PortfolioPage';
import ContactPage from './ContactPage';
import ScrollToTop from './ScrollToTop';
import PartnershipsPage from './PartnershipsPage';
import LiveSupportChat from './LiveSupportChat';
import LoginPage from './LoginPage';
import ProjectDetailPage from './ProjectDetailPage';

const App: React.FC = () => {
  
  // Security Protocols: Disable Inspection, Context Menu, Printing, Saving, Dragging, Selection
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Keyboard Shortcuts (Inspector, View Source, Save, Print)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Inspect Element
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Console
        (e.ctrlKey && e.shiftKey && e.key === 'C') || // Inspect Element
        (e.ctrlKey && e.key === 'u') ||               // View Source
        (e.ctrlKey && e.key === 's') ||               // Save Page
        (e.ctrlKey && e.key === 'p')                  // Print Page
      ) {
        e.preventDefault();
      }
    };

    // 3. Disable Dragging (Images/Text)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 4. Disable Selection (Except Inputs)
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow selection inside input and textarea fields
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="bg-[#0a031a] text-white min-h-screen selection:bg-purple-500 selection:text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
        <LiveSupportChat />
      </div>
    </HashRouter>
  );
};

export default App;