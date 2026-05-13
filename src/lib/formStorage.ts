import { FormData, SavedForm } from '@/src/types';

const STORAGE_KEY = 'enumeration_saved_forms';

/**
 * Generate a unique ID for each saved form
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
};

/**
 * Get a display name for a form based on its data
 */
export const getFormDisplayName = (data: FormData): string => {
  return data.bElectorName || data.electorSignatureName || data.fatherName || 'Untitled Form';
};

/**
 * Load all saved forms from localStorage
 */
export const loadSavedForms = (): SavedForm[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const forms = JSON.parse(raw) as SavedForm[];
    // Sort by updatedAt descending (most recent first)
    return forms.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch {
    return [];
  }
};

/**
 * Save a form (create new or update existing)
 * Returns the saved form's ID
 */
export const saveForm = (data: FormData, existingId?: string): string => {
  const forms = loadSavedForms();
  const now = new Date().toISOString();
  const name = getFormDisplayName(data);

  if (existingId) {
    // Update existing form
    const idx = forms.findIndex(f => f.id === existingId);
    if (idx !== -1) {
      forms[idx] = { ...forms[idx], name, data, updatedAt: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
      return existingId;
    }
  }

  // Create new form
  const id = generateId();
  const newForm: SavedForm = {
    id,
    name,
    data,
    createdAt: now,
    updatedAt: now,
  };
  forms.push(newForm);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  return id;
};

/**
 * Load a specific saved form by ID
 */
export const loadFormById = (id: string): SavedForm | null => {
  const forms = loadSavedForms();
  return forms.find(f => f.id === id) || null;
};

/**
 * Delete a saved form by ID
 */
export const deleteForm = (id: string): void => {
  const forms = loadSavedForms();
  const filtered = forms.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
