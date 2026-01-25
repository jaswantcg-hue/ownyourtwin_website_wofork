/**
 * Validation Utilities
 * Helper functions for form and data validation
 */

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

// -------------------------------------------------------------------
// Email Validation
// -------------------------------------------------------------------

/**
 * Validate an email address
 * @param email - Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

// -------------------------------------------------------------------
// Password Validation
// -------------------------------------------------------------------

/**
 * Validate a password
 * @param password - Password to validate
 * @param minLength - Minimum password length (default: 8)
 * @returns Validation result
 */
export function validatePassword(password: string, minLength = 8): ValidationResult {
  if (!password || password === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  return { isValid: true };
}

/**
 * Check if passwords match
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns Validation result
 */
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  return { isValid: true };
}

// -------------------------------------------------------------------
// Name Validation
// -------------------------------------------------------------------

/**
 * Validate a name field
 * @param name - Name to validate
 * @param fieldName - Name of the field for error messages
 * @returns Validation result
 */
export function validateName(name: string, fieldName = 'Name'): ValidationResult {
  if (!name || name.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` };
  }

  if (name.trim().length > 100) {
    return { isValid: false, error: `${fieldName} must be less than 100 characters` };
  }

  return { isValid: true };
}

// -------------------------------------------------------------------
// Required Field Validation
// -------------------------------------------------------------------

/**
 * Validate that a field is not empty
 * @param value - Value to validate
 * @param fieldName - Name of the field for error messages
 * @returns Validation result
 */
export function validateRequired(value: unknown, fieldName = 'Field'): ValidationResult {
  if (value === null || value === undefined) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (typeof value === 'string' && value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

// -------------------------------------------------------------------
// URL Validation
// -------------------------------------------------------------------

/**
 * Validate a URL
 * @param url - URL to validate
 * @returns Validation result
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
}

// -------------------------------------------------------------------
// Number Validation
// -------------------------------------------------------------------

/**
 * Validate a number within a range
 * @param value - Value to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @param fieldName - Name of the field for error messages
 * @returns Validation result
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName = 'Value'
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: `${fieldName} must be a valid number` };
  }

  if (value < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (value > max) {
    return { isValid: false, error: `${fieldName} must be no more than ${max}` };
  }

  return { isValid: true };
}

// -------------------------------------------------------------------
// Form Validation Helper
// -------------------------------------------------------------------

/**
 * Validate an entire form
 * @param validators - Object with field names and their validation functions
 * @returns Object with field errors (empty if all valid)
 */
export function validateForm(
  validators: Record<string, () => ValidationResult>
): FormErrors {
  const errors: FormErrors = {};

  for (const [field, validate] of Object.entries(validators)) {
    const result = validate();
    if (!result.isValid) {
      errors[field] = result.error;
    }
  }

  return errors;
}

/**
 * Check if a form has any errors
 * @param errors - Form errors object
 * @returns True if there are any errors
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(error => error !== undefined);
}

// -------------------------------------------------------------------
// Login Form Validation
// -------------------------------------------------------------------

export interface LoginFormData {
  email: string;
  password: string;
}

export function validateLoginForm(data: LoginFormData): FormErrors {
  return validateForm({
    email: () => validateEmail(data.email),
    password: () => validateRequired(data.password, 'Password'),
  });
}

// -------------------------------------------------------------------
// Registration Form Validation
// -------------------------------------------------------------------

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export function validateRegistrationForm(data: RegistrationFormData): FormErrors {
  const errors = validateForm({
    name: () => validateName(data.name),
    email: () => validateEmail(data.email),
    password: () => validatePassword(data.password),
    confirmPassword: () => validatePasswordMatch(data.password, data.confirmPassword),
  });

  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions';
  }

  return errors;
}

// -------------------------------------------------------------------
// Waitlist Form Validation
// -------------------------------------------------------------------

export interface WaitlistFormData {
  name: string;
  email: string;
  reason?: string;
}

export function validateWaitlistForm(data: WaitlistFormData): FormErrors {
  return validateForm({
    name: () => validateName(data.name),
    email: () => validateEmail(data.email),
  });
}
