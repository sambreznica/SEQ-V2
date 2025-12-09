import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-seq-ink/80 border-b border-seq-border/30 transition-all duration-300">
    <Link to="/" className="text-lg font-bold tracking-tighter text-white select-none flex items-center gap-2">
      SEQUENCE <span className="text-seq-jade text-[10px] font-mono border border-seq-jade/30 px-1 rounded-sm">V2.1</span>
    </Link>
    <div className="hidden md:flex gap-8 text-xs font-mono text-seq-subtext tracking-wide items-center">
      <Link to="/" className="hover:text-seq-jade transition-colors">HOME</Link>
      <Link to="/engine" className="hover:text-seq-jade transition-colors">ENGINE</Link>
      <Link to="/product" className="hover:text-seq-jade transition-colors">PRODUCT</Link>
      <Link to="/whitepaper" className="hover:text-seq-jade transition-colors">WHITEPAPER</Link>
      <Link to="/diagrams" className="hover:text-seq-jade transition-colors">DIAGRAMS</Link>
      <Link
        to="/early-access"
        className="text-[11px] font-mono tracking-[0.18em] uppercase text-seq-subtext/70 hover:text-seq-jade transition-colors"
      >
        Be first
      </Link>
    </div>
    <div className="flex flex-col items-end">
      <button className="text-xs font-mono bg-white text-seq-ink px-4 py-2 rounded-sm hover:bg-seq-jade hover:text-white transition-colors font-medium border border-transparent hover:border-seq-jade/50">
        ACCESS_TERMINAL
      </button>
      <div className="text-[10px] font-mono tracking-wide text-seq-jade/70 mt-1 text-right">
        COMING SOON
      </div>
    </div>
  </nav>
);

export default Navbar;


