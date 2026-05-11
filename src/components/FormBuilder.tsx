import React, { useState } from 'react';
import { FormData } from '@/src/types';
import { FormInput } from './FormInput';
import { User, CreditCard, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormBuilderProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onPreview: () => void;
}

export const FormBuilder = ({ data, onChange, onPreview }: FormBuilderProps) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 4;

  const updateField = (field: keyof FormData) => (value: string) => {
    onChange({ [field]: value });
    if (error) setError(null);
  };

  const isBSectionFilled = () => {
    return data.bElectorName.trim() !== '';
  };

  const isCSectionFilled = () => {
    return data.cName.trim() !== '';
  };

  const validateStep = (s: number): boolean => {
    switch (s) {
      case 1:
        if (!data.dob || !data.mobileNo || !data.fatherName) {
          setError('Please fill all required fields in Section A.');
          return false;
        }
        return true;
      case 2:
        return true; // Section B is optional by itself, but checked at Step 3
      case 3:
        if (!isBSectionFilled() && !isCSectionFilled()) {
          setError('Please provide details in either Section B (Elector) or Section C (Relative).');
          return false;
        }
        return true;
      case 4:
        if (!data.electorSignatureName || !data.electorRelationship || !data.date) {
          setError('Please complete the signature section.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onPreview();
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (s: number) => {
    // Only allow clicking steps before current or if current is valid
    if (s < step) {
      setStep(s);
      setError(null);
    } else if (s > step) {
      // Validate all steps between current and target
      for (let i = step; i < s; i++) {
        if (!validateStep(i)) return;
      }
      setStep(s);
      setError(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <section className="space-y-6 bg-natural-card p-6 rounded-md border border-natural-border shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-natural-border">
                <User className="w-4 h-4 text-natural-accent" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-natural-text">Personal Details (Section A)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <FormInput label="Date of Birth" type="date" value={data.dob} onValueChange={updateField('dob')} required />
                <FormInput label="Aadhaar No. (Optional)" placeholder="ENTER 12 DIGIT AADHAAR" value={data.aadhaarNo} onValueChange={updateField('aadhaarNo')} maxLength={12} />
                <FormInput label="Mobile No." placeholder="ENTER 10 DIGIT MOBILE NO" value={data.mobileNo} onValueChange={updateField('mobileNo')} maxLength={10} required />
                <FormInput label="Father’s/Guardian’s Name" placeholder="ENTER FULL NAME" value={data.fatherName} onValueChange={updateField('fatherName')} required />
                <FormInput label="Father’s/Guardian’s EPIC No." placeholder="ENTER EPIC NUMBER" value={data.fatherEpic} onValueChange={updateField('fatherEpic')} />
                <FormInput label="Mother’s Name" placeholder="ENTER FULL NAME" value={data.motherName} onValueChange={updateField('motherName')} />
                <FormInput label="Mother’s EPIC No." placeholder="ENTER EPIC NUMBER" value={data.motherEpic} onValueChange={updateField('motherEpic')} />
                <FormInput label="Spouse’s Name" placeholder="ENTER FULL NAME" value={data.spouseName} onValueChange={updateField('spouseName')} />
                <FormInput label="Spouse’s EPIC No." placeholder="ENTER EPIC NUMBER" value={data.spouseEpic} onValueChange={updateField('spouseEpic')} />
              </div>
            </section>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 p-6 bg-natural-card rounded-md border border-natural-border shadow-sm"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-natural-border">
              <CreditCard className="w-4 h-4 text-natural-accent" />
              <div className="flex-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-natural-text">Details of the Elector (B)</h3>
                <p className="text-[10px] text-natural-muted normal-case mt-0.5">Fill either this or the next section (Relative)</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <FormInput label="Elector Name" placeholder="ENTER NAME AS IN ROLL" value={data.bElectorName} onValueChange={updateField('bElectorName')} />
              <FormInput label="EPIC No. (If Available)" placeholder="ENTER EPIC NO" value={data.bEpicNo} onValueChange={updateField('bEpicNo')} />
              <FormInput label="Relative's Name" placeholder="ENTER RELATIVE'S NAME" value={data.bRelativeName} onValueChange={updateField('bRelativeName')} />
              <FormInput label="Relationship" value={data.bRelationship} onValueChange={updateField('bRelationship')} placeholder="FATHER / MOTHER / SPOUSE" />
              <FormInput label="District" placeholder="ENTER DISTRICT" value={data.bDistrict} onValueChange={updateField('bDistrict')} />
              <FormInput label="State" placeholder="ENTER STATE" value={data.bState} onValueChange={updateField('bState')} />
              <FormInput label="AC Name" placeholder="ENTER ASSEMBLY CONSTITUENCY" value={data.bAcName} onValueChange={updateField('bAcName')} />
              <div className="grid grid-cols-3 gap-3 md:col-span-1">
                <FormInput label="AC No" placeholder="NO" value={data.bAcNumber} onValueChange={updateField('bAcNumber')} />
                <FormInput label="Part No" placeholder="PART" value={data.bPartNo} onValueChange={updateField('bPartNo')} />
                <FormInput label="Sr No" placeholder="SR" value={data.bSrNo} onValueChange={updateField('bSrNo')} />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 p-6 bg-natural-card rounded-md border border-natural-border shadow-sm"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-natural-border">
              <CreditCard className="w-4 h-4 text-natural-accent" />
              <div className="flex-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-natural-text">Details of the Relative (C)</h3>
                <p className="text-[10px] text-natural-muted normal-case mt-0.5">Required if Section B was skipped</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <FormInput label="Name" placeholder="ENTER NAME" value={data.cName} onValueChange={updateField('cName')} />
              <FormInput label="EPIC No. (If Available)" placeholder="ENTER EPIC NO" value={data.cEpicNo} onValueChange={updateField('cEpicNo')} />
              <FormInput label="Relative's Name" placeholder="ENTER RELATIVE'S NAME" value={data.cRelativeName} onValueChange={updateField('cRelativeName')} />
              <FormInput label="Relationship" value={data.cRelationship} onValueChange={updateField('cRelationship')} placeholder="SON / DAUGHTER / SPOUSE" />
              <FormInput label="District" placeholder="ENTER DISTRICT" value={data.cDistrict} onValueChange={updateField('cDistrict')} />
              <FormInput label="State" placeholder="ENTER STATE" value={data.cState} onValueChange={updateField('cState')} />
              <FormInput label="AC Name" placeholder="ENTER ASSEMBLY CONSTITUENCY" value={data.cAcName} onValueChange={updateField('cAcName')} />
              <div className="grid grid-cols-3 gap-3 md:col-span-1">
                <FormInput label="AC No" placeholder="NO" value={data.cAcNumber} onValueChange={updateField('cAcNumber')} />
                <FormInput label="Part No" placeholder="PART" value={data.cPartNo} onValueChange={updateField('cPartNo')} />
                <FormInput label="Sr No" placeholder="SR" value={data.cSrNo} onValueChange={updateField('cSrNo')} />
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 p-6 bg-natural-card rounded-md border border-natural-border shadow-sm"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-natural-border">
              <CheckCircle2 className="w-4 h-4 text-natural-accent" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-natural-text">Submission & Signature</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <FormInput label="Signatory Name" placeholder="ENTER FULL NAME" value={data.electorSignatureName} onValueChange={updateField('electorSignatureName')} required />
              <FormInput label="Relationship to Elector" placeholder="SELF / FATHER / ETC" value={data.electorRelationship} onValueChange={updateField('electorRelationship')} required />
              <FormInput label="Date of Filing" type="date" value={data.date} onValueChange={updateField('date')} required />
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-sm mt-4">
              <p className="text-[11px] text-blue-800 normal-case leading-relaxed">
                By clicking "Preview Final Form", you confirm that all information provided is true to the best of your knowledge.
              </p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const steps = [
    { id: 1, label: 'General' },
    { id: 2, label: 'Elector' },
    { id: 3, label: 'Relative' },
    { id: 4, label: 'Finish' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Stepper Indicator */}
      <div className="flex justify-between items-center mb-8 px-2 max-w-2xl mx-auto">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-2 group">
              <button 
                onClick={() => handleStepClick(s.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.id 
                  ? 'bg-natural-accent text-white scale-110 shadow-md ring-4 ring-natural-accent/10' 
                  : step > s.id 
                    ? 'bg-natural-accent/20 text-natural-accent' 
                    : 'bg-white border border-natural-border text-natural-muted'
                }`}
              >
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </button>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${step === s.id ? 'text-natural-accent' : 'text-natural-muted'}`}>
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-2 -mt-6 transition-colors ${step > s.id + 1 ? 'bg-natural-accent/30' : 'bg-natural-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-50 border border-red-100 rounded-sm"
          >
            <p className="text-[11px] text-red-600 uppercase font-bold tracking-wider text-center">{error}</p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between pt-8 border-t border-natural-border">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all ${
            step === 1 
            ? 'opacity-0 pointer-events-none' 
            : 'text-natural-muted hover:text-natural-text bg-white border border-natural-border'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={nextStep}
          className="flex items-center gap-2 bg-natural-accent hover:bg-natural-accent-hover text-white px-8 md:px-12 py-3 rounded text-xs font-bold uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {step === totalSteps ? 'Preview Final Form' : 'Continue'}
          {step !== totalSteps && <ChevronRight className="w-4 h-4" />}
          {step === totalSteps && <CheckCircle2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
