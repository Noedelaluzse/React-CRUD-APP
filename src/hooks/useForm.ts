import { useState, ChangeEvent, useEffect } from 'react';

type FormValues = {
  [key: string]: any; 
};

export const useForm = <T extends FormValues>(initialForm: T, ) => {
  const [formState, setFormState] = useState<T>(initialForm);


  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const updateForm = (updatedValues: Partial<T>) => {
    setFormState((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    updateForm
  };
};