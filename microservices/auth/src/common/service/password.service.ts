import * as bcrypt from 'bcryptjs';

const SALT = 'FDS-sdsadawwdsxzca.KSD49KFDS9KFkfds.f9k49k49fkdsk-f49kfs';

export const hashPassword = (password: string): string => {
  return bcrypt.hash(password, SALT);
};

export const validatePassword = (
  hashedPassword: string,
  password: string,
): boolean => {
  return bcrypt.compare(hashedPassword, password);
};
