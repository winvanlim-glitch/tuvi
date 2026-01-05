import { useState } from 'react';

export type Step = 'input' | 'processing' | 'result';

export function useStepTransition(initialStep: Step = 'input') {
    const [step, setStep] = useState<Step>(initialStep);

    const goToInput = () => setStep('input');
    const goToProcessing = () => setStep('processing');
    const goToResult = () => setStep('result');
    const reset = () => setStep('input');

    return {
        step,
        setStep,
        goToInput,
        goToProcessing,
        goToResult,
        reset
    };
}
