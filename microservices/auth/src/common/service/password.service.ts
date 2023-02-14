import * as bcrypt from 'bcryptjs';

const SALT = 12312312;
// TODO: learn about bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

export const validatePassword = async (
  hashedPassword: string,
  password: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
