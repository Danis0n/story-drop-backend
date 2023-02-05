import {
  sd_user as UserEntity,
  sd_user_info as UserInfoEntity,
  role as RoleEntity,
  image as ImageEntity,
  sd_role_user as RoleUserEntity,
} from '@prisma/client';
import { UserDto, UserInfoDto } from '../dto/user.dto';
import { Builder } from 'builder-pattern';
import {
  roleWithRelationData,
  UserWithRelationData,
} from '../../prisma/utils/prisma.validate';

// TODO: make mapper with builder

export class UserMapper {
  public mapToUserDto(user: UserWithRelationData): UserDto {
    return Builder(UserDto)
      .uuid(user.user_id)
      .email(user.email)
      .username(user.username)
      .nickname(user.nickname)
      .isEnabled(user.is_enabled)
      .isLocked(user.is_blocked)
      .info(this.mapToUserInfoDto(user.sd_user_info))
      .isAvatar(!!user.avatar_id)
      .roles(this.mapRoleToString(user.sd_role_user))
      .build();
  }

  private mapRoleToString(userRoles: roleWithRelationData[]): string[] {
    return userRoles.map((role) => {
      return role.role.role_name;
    });
  }

  private mapToUserInfoDto(userInfo: UserInfoEntity): UserInfoDto {
    return Builder(UserInfoDto)
      .text(userInfo.text)
      .contact(userInfo.contact)
      .build();
  }

  mapArrayToUserDto(users: UserWithRelationData[]): UserDto[] {
    return users.map((user) => {
      return this.mapToUserDto(user);
    });
  }
}
