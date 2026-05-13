/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { initialFormData, FormData, SavedForm } from './types';
import { FormBuilder } from './components/FormBuilder';
import { FormPreview } from './components/FormPreview';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FileDown, Edit3, ArrowLeft, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { loadSavedForms, saveForm } from './lib/formStorage';

import { Hero } from './components/Hero';

type ViewMode = 'landing' | 'filling' | 'preview';

export default function App() {
  const [data, setData] = useState<FormData>(initialFormData);
  const [view, setView] = useState<ViewMode>('landing');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFormId, setCurrentFormId] = useState<string | null>(null);
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load saved forms on mount and when returning to landing
  const refreshSavedForms = useCallback(() => {
    setSavedForms(loadSavedForms());
  }, []);

  useEffect(() => {
    refreshSavedForms();
  }, [refreshSavedForms]);

  const handleDataChange = (newData: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  // Auto-save when going to preview
  const handlePreview = () => {
    const id = saveForm(data, currentFormId || undefined);
    setCurrentFormId(id);
    setView('preview');
    refreshSavedForms();
  };

  // Load a saved form from history
  const handleLoadForm = (form: SavedForm) => {
    setData(form.data);
    setCurrentFormId(form.id);
    setView('filling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start a fresh new form
  const handleStartNew = () => {
    setData(initialFormData);
    setCurrentFormId(null);
    setView('filling');
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    
    try {
      // Use higher scale for better quality on canvas
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Use applicant name for filename
      const filename = `${data.bElectorName || data.electorSignatureName || 'Enumeration_Form'}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('FAILED TO GENERATE PDF. PLEASE TRY AGAIN.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleView = () => {
    if (view === 'preview') {
      setView('filling');
    } else {
      // Save before switching to preview
      const id = saveForm(data, currentFormId || undefined);
      setCurrentFormId(id);
      setView('preview');
      refreshSavedForms();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    // Auto-save current form progress if there's data entered
    const hasData = data.fatherName || data.bElectorName || data.address || data.mobileNo;
    if (hasData) {
      const id = saveForm(data, currentFormId || undefined);
      setCurrentFormId(id);
    }
    refreshSavedForms();
    setView('landing');
    // Reset for next time
    setData(initialFormData);
    setCurrentFormId(null);
  };

  return (
    <div className="min-h-screen bg-natural-bg font-serif selection:bg-natural-border/30 uppercase">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-natural-border px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { if (view !== 'landing') handleGoHome(); }}>
            <div className="bg-natural-accent p-1.5 rounded text-white">
              <ClipboardList className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight text-natural-text hidden sm:block">
              Electoral <span className="font-sans text-xs uppercase tracking-widest ml-1 opacity-60">Processor</span>
            </span>
          </div>
          
          <div className="flex gap-3">
            {view === 'filling' && (
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-natural-muted hover:text-natural-text transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </button>
            )}
            {view === 'preview' && (
              <>
                <button
                  onClick={toggleView}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-natural-muted hover:text-natural-text transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Form
                </button>
                <button
                  disabled={isGenerating}
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-6 py-2 bg-natural-accent hover:bg-natural-accent-hover text-white rounded text-xs font-bold uppercase tracking-widest shadow-sm transition-all disabled:opacity-50"
                >
                  {isGenerating ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Printer className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                  {isGenerating ? 'Processing...' : 'Download PDF'}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className={view === 'landing' ? '' : 'py-8 px-4'}>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <div key="landing">
              <Hero
                onStart={handleStartNew}
                savedForms={savedForms}
                onLoadForm={handleLoadForm}
                onRefreshForms={refreshSavedForms}
              />
            </div>
          ) : view === 'filling' ? (
            <div key="filling">
              <FormBuilder 
                data={data} 
                onChange={handleDataChange} 
                onPreview={handlePreview} 
              />
            </div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <div className="max-w-[900px] mx-auto text-center space-y-2 mb-10">
                <h2 className="text-2xl font-bold text-[#1e293b]">Preview Mode</h2>
                <p className="text-[#64748b] normal-case">Review your details below. If everything is correct, click the download button above.</p>
                <button 
                  onClick={toggleView}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#2563eb] hover:underline mt-2"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Return to editor
                </button>
              </div>
              <FormPreview data={data} ref={previewRef} />
              
              <div className="flex justify-center p-12">
                <button
                  disabled={isGenerating}
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-10 py-4 bg-natural-accent hover:bg-natural-accent-hover text-white rounded text-xs font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <FileDown className="w-6 h-6" />
                  {isGenerating ? 'PREPARING PDF...' : 'DOWNLOAD FILLED FORM'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-[#e2e8f0] bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#94a3b8] text-sm normal-case">
          <p>© 2026 ENUMERATION FORM BUILDER. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

const ClipboardList = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
    <path d="M9 8h6" />
  </svg>
);

