import { useState } from "react";
import { ZodSchema } from "zod";

/**
 * @param {ZodSchema} schema
 */
export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    try {
      const result = schema.parse(data);
      setErrors({});
      return { isValid: true, data: result };
    } catch (error) {
      const formattedErrors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
      } else {
        formattedErrors.form = error.message;
      }
      setErrors(formattedErrors);
      return { isValid: false, errors: formattedErrors };
    }
  };

  return { errors, validateForm, setErrors };
};
