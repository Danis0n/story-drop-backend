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
  roleWithInclude,
  UserWithInclude,
} from '../../prisma/utils/prisma.validate';

// TODO: make mapper with builder

export class UserMapper {
  public mapToUserDto(user: UserWithInclude): UserDto {
    return (
      Builder(UserDto)
        .uuid(user.user_id)
        .email(user.email)
        .username(user.username)
        .nickname(user.nickname)
        .isEnabled(user.is_enabled)
        .isLocked(user.is_blocked)
        .info(this.mapToUserInfoDto(user.sd_user_info))
        // .roles(this.mapRoleToString(user.sd_role_user))
        .build()
    );
  }

  private mapRoleToString(userRoles: roleWithInclude[]): string[] {
    const roles: string[] = [];
    userRoles.map((role) => {
      role.role.role_name;
    });
    // userRoles.map(role => {
    //   role.
    // })

    return roles;
  }

  private mapToUserInfoDto(userInfo: UserInfoEntity): UserInfoDto {
    return Builder(UserInfoDto)
      .text(userInfo.text)
      .contact(userInfo.contact)
      .build();
  }
}
