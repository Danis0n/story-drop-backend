import { Prisma } from '@prisma/client';

export const roleInclude = Prisma.validator<Prisma.sd_role_userInclude>()({
  role: true,
});

export const userIncludeRelations = Prisma.validator<Prisma.sd_userInclude>()({
  sd_user_info: true,
  sd_role_user: {
    include: { role: true },
  },
});

export const userIncludeAvatar = Prisma.validator<Prisma.sd_userInclude>()({
  image: true,
});

export const userIncludeRoleRelation =
  Prisma.validator<Prisma.sd_userInclude>()({
    sd_role_user: {
      include: { role: true },
    },
  });

export type UserWithImage = Prisma.sd_userGetPayload<{
  include: typeof userIncludeAvatar;
}>;

export type roleWithRelationData = Prisma.sd_role_userGetPayload<{
  include: typeof roleInclude;
}>;

export type UserWithRelationData = Prisma.sd_userGetPayload<{
  include: typeof userIncludeRelations;
}>;

export type UserWithRoleRelationData = Prisma.sd_userGetPayload<{
  include: typeof userIncludeRoleRelation;
}>;
