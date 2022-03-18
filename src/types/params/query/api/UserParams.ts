import {
  AuthDto,
  RecoverPasswordDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateUserDto,
  ValidateRecoveryDto
} from 'types/dtos';
import { UpdatePasswordDto } from 'types/dtos/UpdatePasswordDto';
import { SecurityParams } from 'types/params';

export type whoIamParams = SecurityParams;

export type AuthParams = {
  data: AuthDto;
};

export type RegisterUserParams = {
  data: RegisterDto;
};

export type RecoverPasswordParams = {
  data: RecoverPasswordDto;
};

export type ValidateRecoveryParams = {
  data: ValidateRecoveryDto;
};

export type ResetPasswordParams = {
  data: ResetPasswordDto;
};

export type UpdateUserParams = SecurityParams & {
  data: UpdateUserDto;
};

export type UpdatePasswordParams = SecurityParams & {
  data: UpdatePasswordDto;
};
