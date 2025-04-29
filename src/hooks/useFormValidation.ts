import { useState } from "react";
import { ZodSchema } from "zod";

/**
 * @param {ZodSchema} schema
 */
export const useFormValidation = <T extends Record<string, any>>(schema: ZodSchema<T>) => {
  
  type Errors = Partial<Record<keyof T | 'form', string>>;
  
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (data: unknown) => {
    try {
      const result = schema.parse(data);
      setErrors({});
      return { isValid: true, data: result as T };
    } catch (error) {
      const formattedErrors: Errors = {};
      if (error && typeof error === 'object' && 'errors' in error) {
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        zodError.errors.forEach((err) => {
          const path = err.path[0] as keyof T;
          formattedErrors[path] = err.message;
        });
      } else if (error instanceof Error) {
        formattedErrors.form = error.message;
      } else {
        formattedErrors.form = "Une erreur inconnue s'est produite";
      }
      
      setErrors(formattedErrors);
      return { isValid: false, errors: formattedErrors };
    }
  };

  return { errors, validateForm, setErrors };
};
