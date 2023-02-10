import * as bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
  return bcrypt.hash(password, 5);
};

export const validatePassword = (
  hashedPassword: string,
  password: string,
): boolean => {
  return bcrypt.compare(hashedPassword, password);
};
