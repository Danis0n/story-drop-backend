import { Prisma } from '@prisma/client';

export const RoleInclude = Prisma.validator<Prisma.sd_role_userInclude>()({
  role: true,
});

export const UserInclude = Prisma.validator<Prisma.sd_userInclude>()({
  sd_user_info: true,
  sd_role_user: {
    include: { role: true },
  },
});

export const UserIncludeAvatar = Prisma.validator<Prisma.sd_userInclude>()({
  image: true,
});

export const UserIncludeRole = Prisma.validator<Prisma.sd_userInclude>()({
  sd_role_user: {
    include: { role: true },
  },
});

export type UserWithImage = Prisma.sd_userGetPayload<{
  include: typeof UserIncludeAvatar;
}>;

export type RoleWithRelationData = Prisma.sd_role_userGetPayload<{
  include: typeof RoleInclude;
}>;

export type UserWithRelationData = Prisma.sd_userGetPayload<{
  include: typeof UserInclude;
}>;

export type UserWithRoleRelationData = Prisma.sd_userGetPayload<{
  include: typeof UserIncludeRole;
}>;
