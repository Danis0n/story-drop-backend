import { ROLE_USER } from './role.constants';

export const PRISMA_USER_INCLUDE = {
  sd_user_info: true,
  sd_role_user: { include: { role: true } },
  image: true,
};

export const PRISMA_USER_CREATE_BASE_ROLE = {
  create: [{ role_id: ROLE_USER }],
};
