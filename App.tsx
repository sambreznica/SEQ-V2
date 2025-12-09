import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Landing from './pages/Landing';
import Engine from './pages/Engine';
import ProductPage from './pages/Product';
import WhitepaperPage from './pages/Whitepaper';
import Diagrams from './pages/Diagrams';
import EarlyAccess from './pages/EarlyAccess';

const Footer = () => (
  <footer className="py-12 border-t border-seq-border/30 bg-seq-ink text-center">
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold tracking-tighter text-white opacity-20">SEQUENCE</div>
      <div className="text-[10px] text-seq-subtext/40 font-mono">
        SEQUENCE SYSTEMS © 2024 // ALL RIGHTS RESERVED // OPERATOR MANUAL V2.1
      </div>
      <div className="flex gap-4 text-[10px] text-seq-subtext/40 font-mono underline decoration-seq-border underline-offset-4">
        <a href="#" className="hover:text-seq-jade">PRIVACY</a>
        <a href="#" className="hover:text-seq-jade">TERMS</a>
        <a href="#" className="hover:text-seq-jade">STATUS</a>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <HashRouter>
      <div className="bg-seq-ink min-h-screen text-seq-text selection:bg-seq-jade/30 selection:text-white relative font-sans">
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/engine" element={<Engine />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/whitepaper" element={<WhitepaperPage />} />
            <Route path="/diagrams" element={<Diagrams />} />
            <Route path="/early-access" element={<EarlyAccess />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
