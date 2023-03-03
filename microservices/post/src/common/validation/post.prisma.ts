import { Prisma } from '@prisma/client';

export const PostInclude = Prisma.validator<Prisma.postInclude>()({
  paring_post: { include: { paring: true } },
  collection_post: { include: { collection: true } },
  post_genre: { include: { genre: true } },
  post_tag: { include: { tag: true } },
  fandom_post: { include: { fandom: true } },
  character_post: { include: { character: true } },
  chapter: true,
});

export type PostWithRelations = Prisma.postGetPayload<{
  include: typeof PostInclude;
}>;
