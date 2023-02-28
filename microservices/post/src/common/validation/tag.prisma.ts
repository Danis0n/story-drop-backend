import { Prisma } from '@prisma/client';

export const AgeInclude = Prisma.validator<Prisma.tagInclude>()({
  age: true,
});

export type TagWithRelation = Prisma.tagGetPayload<{
  include: typeof AgeInclude;
}>;
