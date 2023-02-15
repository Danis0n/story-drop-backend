export class PrismaImageDto {
  image_id: string;
  content_type: string;
  data: Buffer;
  image_name: string;
  image_size: bigint;
}
