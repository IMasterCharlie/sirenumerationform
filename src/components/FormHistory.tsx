import React, { useState } from 'react';
import { SavedForm } from '@/src/types';
import { deleteForm } from '@/src/lib/formStorage';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Trash2, Clock, Edit3 } from 'lucide-react';

interface FormHistoryProps {
  forms: SavedForm[];
  onLoad: (form: SavedForm) => void;
  onRefresh: () => void;
}

export const FormHistory = ({ forms, onLoad, onRefresh }: FormHistoryProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    setTimeout(() => {
      deleteForm(id);
      onRefresh();
      setDeletingId(null);
    }, 300);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (forms.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-natural-accent" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-natural-text">
          Saved Forms ({forms.length})
        </h2>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {forms.map((form) => (
            <motion.div
              key={form.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: deletingId === form.id ? 0 : 1, x: deletingId === form.id ? 50 : 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.25 }}
              onClick={() => onLoad(form)}
              className="group flex items-center gap-4 p-4 bg-natural-card hover:bg-white border border-natural-border hover:border-natural-accent/30 rounded-md cursor-pointer transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-md bg-natural-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-natural-accent/20 transition-colors">
                <FileText className="w-5 h-5 text-natural-accent" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-natural-text truncate">
                  {form.name}
                </p>
                <p className="text-[10px] text-natural-muted normal-case mt-0.5">
                  Last edited: {formatDate(form.updatedAt)}
                </p>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 text-[10px] text-natural-accent font-bold uppercase tracking-widest">
                  <Edit3 className="w-3 h-3" />
                  Edit
                </span>
                <button
                  onClick={(e) => handleDelete(e, form.id)}
                  className="p-2 text-natural-muted hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Delete form"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
