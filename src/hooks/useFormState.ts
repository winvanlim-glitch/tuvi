import { useState } from 'react';

export interface FormData {
    fullName: string;
    dob: string;
    tob: string;
    pob: string;
    gender: string;
}

const defaultFormData: FormData = {
    fullName: '',
    dob: '',
    tob: '',
    pob: 'Hà Nội, Việt Nam',
    gender: 'Nam'
};

export function useFormState(initialData: Partial<FormData> = {}) {
    const [formData, setFormData] = useState<FormData>({
        ...defaultFormData,
        ...initialData
    });

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const resetForm = () => {
        setFormData(defaultFormData);
    };

    const isValid = () => {
        return formData.fullName.trim() !== '' && formData.dob !== '' && formData.tob !== '';
    };

    return {
        formData,
        setFormData,
        updateField,
        updateFormData,
        resetForm,
        isValid
    };
}
