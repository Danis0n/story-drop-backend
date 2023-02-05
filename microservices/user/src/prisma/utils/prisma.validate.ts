import { Prisma } from '@prisma/client';

export const roleInclude = Prisma.validator<Prisma.sd_role_userInclude>()({
  role: true,
});

export const userInclude = Prisma.validator<Prisma.sd_userInclude>()({
  sd_user_info: true,
  sd_role_user: {
    include: { role: true },
  },
});

export type roleWithRelationData = Prisma.sd_role_userGetPayload<{
  include: typeof roleInclude;
}>;

export type UserWithRelationData = Prisma.sd_userGetPayload<{
  include: typeof userInclude;
}>;
