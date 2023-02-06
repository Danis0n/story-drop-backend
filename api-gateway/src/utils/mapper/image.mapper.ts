import {
  CreateImageDto,
  UpdateAvatarDto,
  UpdateAvatarRequestDto,
} from '../dto/user.dto';
import { Builder } from 'builder-pattern';

export const mapToCreateImage = (file: Express.Multer.File): CreateImageDto => {
  return !!file
    ? Builder(CreateImageDto)
        .fieldName(file.fieldname)
        .originalName(file.originalname)
        .size(file.size)
        .buffer(file.buffer)
        .mimetype(file.mimetype)
        .build()
    : null;
};

export const mapToUpdateImage = (
  id: string,
  file: Express.Multer.File,
  payload: UpdateAvatarDto,
): UpdateAvatarRequestDto => {
  return Builder(UpdateAvatarRequestDto)
    .image(mapToCreateImage(file))
    .uuid(id)
    .delete(payload.delete)
    .build();
};
