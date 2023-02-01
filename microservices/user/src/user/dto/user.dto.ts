import { Image, User, UserInfo } from '../proto/user.pb';

export class ImageDto implements Image {
  buffer: string;
  date: string;
  imageUuid: string;
  name: string;
}

export class UserInfoDto implements UserInfo {
  contact: string;
  text: string;
}

export class UserDto implements User {
  avatar: ImageDto;
  email: string;
  info: UserInfoDto;
  isEnabled: boolean;
  isLocked: boolean;
  nickname: string;
  roles: string[];
  username: string;
  uuid: string;
}
