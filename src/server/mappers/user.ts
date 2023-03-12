import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { UserResponseDto } from '../dtos/user';

type Deps = { session: Session };

export const userMapper = ({ session }: Deps) => {
  return {
    toResponseDto(user: User, { forceSelf = false } = {}): UserResponseDto {
      // forceSelf is used when mapping the session user in a context where the server session is unavailable
      return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        tosAcceptedAt: user.tosAcceptedAt,
        image: user.image,
        email: forceSelf || session.user.id === user.id ? user.email : undefined
      };
    }
  };
};

export type UserMapper = ReturnType<typeof userMapper>;
