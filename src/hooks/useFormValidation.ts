'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';

interface ValidationError {
  field: string;
  message: string;
}

interface UseFormValidationProps<T> {
  schema: z.ZodSchema<T>;
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
}: UseFormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  const validateField = useCallback(
    (name: string, value: any) => {
      try {
        schema.shape[name].parse(value);
        setErrors((prev) => prev.filter((error) => error.field !== name));
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => [
            ...prev.filter((e) => e.field !== name),
            {
              field: name,
              message: error.errors[0].message,
            },
          ]);
        }
        return false;
      }
    },
    [schema]
  );

  const validateForm = useCallback(() => {
    try {
      schema.parse(values);
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        setErrors(newErrors);
      }
      return false;
    }
  }, [schema, values]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors([]);
    setTouched({});
  }, [initialValues]);

  const getFieldError = useCallback(
    (name: string) => {
      return errors.find((error) => error.field === name)?.message;
    },
    [errors]
  );

  const isFieldTouched = useCallback(
    (name: string) => {
      return touched[name] || false;
    },
    [touched]
  );

  const sanitizeInput = useCallback((value: string) => {
    // Basic XSS prevention
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateField,
    validateForm,
    getFieldError,
    isFieldTouched,
    sanitizeInput,
  };
}

// Example usage:
/*
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const form = useFormValidation({
  schema,
  initialValues: {
    email: '',
    password: '',
    name: '',
  },
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