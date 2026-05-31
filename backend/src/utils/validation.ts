import { HttpError } from "./http-error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type StringFieldOptions = {
  min?: number;
  max?: number;
};

export function requiredString(value: unknown, fieldName: string, options: StringFieldOptions = {}) {
  if (typeof value !== "string") {
    throw new HttpError(400, `${fieldName} is required.`);
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length < 1) {
    throw new HttpError(400, `${fieldName} is required.`);
  }

  if (options.min && trimmedValue.length < options.min) {
    throw new HttpError(400, `${fieldName} must be at least ${options.min} characters.`);
  }

  if (options.max && trimmedValue.length > options.max) {
    throw new HttpError(400, `${fieldName} must be ${options.max} characters or fewer.`);
  }

  return trimmedValue;
}

export function optionalString(value: unknown, fieldName: string, options: StringFieldOptions = {}) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return requiredString(value, fieldName, options);
}

export function requiredEmail(value: unknown) {
  const email = requiredString(value, "email", { max: 254 }).toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    throw new HttpError(400, "email must be a valid email address.");
  }

  return email;
}
