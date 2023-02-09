import { Prisma } from '@prisma/client';

export const sessionIncludeRelations =
  Prisma.validator<Prisma.sessionInclude>()({
    device: true,
  });

export type SessionWithRelationData = Prisma.sessionGetPayload<{
  include: typeof sessionIncludeRelations;
}>;
