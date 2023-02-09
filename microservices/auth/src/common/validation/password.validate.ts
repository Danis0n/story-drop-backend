import * as bcrypt from 'bcryptjs';

export const validatePassword = (
  hashedPassword: string,
  password: string,
): boolean => {
  return bcrypt.compare(hashedPassword, password);
};
