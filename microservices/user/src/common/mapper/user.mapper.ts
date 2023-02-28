import { sd_user_info as UserInfoEntity } from '@prisma/client';
import { UserDto, UserInfoDto } from '../dto';
import { Builder } from 'builder-pattern';
import { RoleWithRelationData, UserWithRelationData } from '../validation';

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

  private mapRoleToString(userRoles: RoleWithRelationData[]): string[] {
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
