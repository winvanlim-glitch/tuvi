'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFormState } from '@/hooks/useFormState';
import { useStepTransition } from '@/hooks/useStepTransition';
import { useTuViCalculation, CalculatedData } from '@/hooks/useTuViCalculation';
import InputForm from '@/components/features/tu-vi/InputForm';
import ProcessingScreen from '@/components/features/tu-vi/ProcessingScreen';
import ChartResult from '@/components/features/tu-vi/ChartResult';

const ChartPage: React.FC = () => {
  const { formData, updateFormData, isValid } = useFormState();
  const { step, goToProcessing, goToResult, reset } = useStepTransition();
  const { calculate } = useTuViCalculation();
  const [result, setResult] = React.useState<CalculatedData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedData = calculate(formData);
    if (calculatedData) {
      setResult(calculatedData);
      goToProcessing();
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <InputForm
            formData={formData}
            onChange={updateFormData}
            onSubmit={handleSubmit}
            isValid={isValid()}
          />
        )}

        {step === 'processing' && (
          <ProcessingScreen onComplete={goToResult} />
        )}

        {step === 'result' && result && (
          <ChartResult data={result} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChartPage;
