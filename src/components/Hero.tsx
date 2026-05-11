import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, ShieldCheck, FileText, Download } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-white py-12 md:py-24 border-b border-natural-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-natural-accent/10 border border-natural-accent/20 text-natural-accent text-[10px] font-bold tracking-widest uppercase"
          >
            <ShieldCheck className="w-3 h-3" />
            Official Electoral Processor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif tracking-tight text-natural-text max-w-3xl leading-[1.1]"
          >
            Digital Enumeration <br />
            <span className="italic text-natural-muted">Form Processor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-natural-muted normal-case max-w-2xl leading-relaxed"
          >
            Generate official Annexure-III electoral enumeration forms with ease. 
            Fill your details through our secure interface and get a print-ready PDF instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <button
              onClick={onStart}
              className="px-10 py-4 bg-natural-accent hover:bg-natural-accent-hover text-white rounded text-xs font-bold uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <ClipboardList className="w-5 h-5" />
              Start Processing Form
            </button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-natural-card flex items-center justify-center border border-natural-border shadow-sm">
                <FileText className="w-6 h-6 text-natural-accent" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-natural-text">Multi-Step Validation</h3>
              <p className="text-[11px] text-natural-muted normal-case leading-relaxed">
                Smart form with built-in validation ensures zero errors in your official submission.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-natural-card flex items-center justify-center border border-natural-border shadow-sm">
                <Download className="w-6 h-6 text-natural-accent" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-natural-text">Instant PDF Export</h3>
              <p className="text-[11px] text-natural-muted normal-case leading-relaxed">
                Get high-quality, pre-filled Annexure-III documents instantly after processing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-natural-card flex items-center justify-center border border-natural-border shadow-sm">
                <ShieldCheck className="w-6 h-6 text-natural-accent" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-natural-text">Secure & Private</h3>
              <p className="text-[11px] text-natural-muted normal-case leading-relaxed">
                Your electoral data is processed locally and never stored on our servers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
