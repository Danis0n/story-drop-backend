import { UpdateDto, UpdateRequestDto } from '../dto/user.dto';
import { Builder } from 'builder-pattern';

export const mapToUpdateUser = (
  id: string,
  payload: UpdateDto,
): UpdateRequestDto => {
  return Builder(UpdateRequestDto)
    .contact(payload.contact)
    .uuid(id)
    .nickname(payload.nickname)
    .text(payload.text)
    .build();
};
