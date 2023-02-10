import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

export const handleRegisterExceptions = (
  foundByEmail: boolean,
  foundByUsername: boolean,
) => {
  if (foundByEmail && foundByUsername)
    throw new GrpcAlreadyExistsException(
      'Данная почта и логином уже используются!',
    );
  if (foundByEmail && !foundByUsername)
    throw new GrpcAlreadyExistsException('Данная почта уже используются!');
  if (!foundByEmail && foundByUsername)
    throw new GrpcAlreadyExistsException('Данный логин уже используются!');
};

export const handleCreateUserException = () => {
  throw new GrpcNotFoundException('Ошибка при создании пользователя');
};
