'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';

interface ValidationError {
  field: string;
  message: string;
}

interface UseFormValidationOptions<T> {
  initialValues: T;
  validationSchema: z.ZodType<T>;
  onSubmit: (values: T) => Promise<void>;
}

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((
    name: keyof T,
    value: T[keyof T]
  ) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const validateField = useCallback((
    name: keyof T,
    value: T[keyof T]
  ) => {
    try {
      const fieldSchema = z.object({ [name]: validationSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === name);
        setErrors(prev => ({ 
          ...prev, 
          [name]: fieldError?.message || 'Invalid value'
        }));
      }
      return false;
    }
  }, [validationSchema]);

  const handleBlur = useCallback((name: keyof T) => {
    validateField(name, values[name]);
  }, [validateField, values]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = validationSchema.parse(values);
      await onSubmit(validatedData);
      // Reset form after successful submission if needed
      // setValues(initialValues);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof T;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateField
  };
}

// Example usage:
// const schema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8)
// });
//
// const { values, errors, handleSubmit, handleChange } = useFormValidation({
//   initialValues: { email: '', password: '' },
//   validationSchema: schema,
//   onSubmit: async (values) => {
//     await api.auth.login(values);
//   }
// });

// Example usage:
/*
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const form = useFormValidation({
  initialValues: {
    email: '',
    password: '',
    name: '',
  },
  validationSchema: schema,
  onSubmit: async (values) => {
    // Handle form submission
    console.log(values);
  },
});

// In your component:
<form onSubmit={form.handleSubmit}>
  <input
    name="email"
    value={form.values.email}
    onChange={form.handleChange}
    onBlur={form.handleBlur}
  />
  {form.isFieldTouched('email') && form.getFieldError('email') && (
    <span className="text-red-500">{form.getFieldError('email')}</span>
  )}
  {/* Other form fields */}
  <button type="submit" disabled={form.isSubmitting}>
    Submit
  </button>
</form>
*/ 