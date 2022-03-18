import { endpoints } from 'constants/endpoints';
import {
  AuthDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateUserDto,
  UserLoggedDto,
  ValidateRecoveryDto,
  ValidateRecoveryResponseDto,
} from 'types/dtos';
import { GetUserDto } from 'types/dtos/GetUserDto';
import { RecoverPasswordDto } from 'types/dtos/RecoverPasswordDto';
import { UpdatePasswordDto } from 'types/dtos/UpdatePasswordDto';
import { IHttpClientRequestParams } from 'types/interfaces';
import {
  AuthParams,
  RecoverPasswordParams,
  RegisterUserParams,
  ResetPasswordParams,
  UpdatePasswordParams,
  UpdateUserParams,
  ValidateRecoveryParams,
  whoIamParams,
} from 'types/params/query/api';
import { httpClient } from './repository';

export const usersRepository = {
  whoIam: async ({ key }: whoIamParams) => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.whoIam,
      requiresToken: true,
      customToken: key,
    };
    return httpClient.get<GetUserDto>(parameters);
  },
  auth: async ({ data }: AuthParams) => {
    const parameters: IHttpClientRequestParams<AuthDto> = {
      url: endpoints.auth,
      requiresToken: false,
      payload: data,
    };
    return httpClient.post<AuthDto, UserLoggedDto>(parameters);
  },
  register: async ({ data }: RegisterUserParams) => {
    const parameters: IHttpClientRequestParams<RegisterDto> = {
      url: endpoints.user,
      requiresToken: false,
      payload: data,
    };
    return httpClient.post<RegisterDto, any>(parameters);
  },
  recoverPassword: async ({ data }: RecoverPasswordParams) => {
    const parameters: IHttpClientRequestParams<RecoverPasswordDto> = {
      url: endpoints.passwordRecovery,
      requiresToken: false,
      payload: data,
    };
    return httpClient.post<RecoverPasswordDto, any>(parameters);
  },
  validateRecovery: async ({ data }: ValidateRecoveryParams) => {
    const parameters: IHttpClientRequestParams<ValidateRecoveryDto> = {
      url: endpoints.validateRecovery,
      requiresToken: false,
      payload: data,
    };
    return httpClient.post<ValidateRecoveryDto, ValidateRecoveryResponseDto>(
      parameters
    );
  },
  restorePassword: async ({ data }: ResetPasswordParams) => {
    const parameters: IHttpClientRequestParams<ResetPasswordDto> = {
      url: endpoints.restorePassword,
      requiresToken: false,
      payload: data,
    };
    return httpClient.post<ResetPasswordDto, any>(parameters);
  },
  updateUser: async ({ data, key }: UpdateUserParams) => {
    const parameters: IHttpClientRequestParams<UpdateUserDto> = {
      url: endpoints.updateUser,
      requiresToken: true,
      payload: data,
      customToken: key,
    };
    return httpClient.put<UpdateUserDto, UpdateUserDto>(parameters);
  },
  updatePassword: async ({ data, key }: UpdatePasswordParams) => {
    const parameters: IHttpClientRequestParams<UpdatePasswordDto> = {
      url: endpoints.updatePassword,
      requiresToken: true,
      payload: data,
      customToken: key,
    };
    return httpClient.post<UpdatePasswordDto, any>(parameters);
  },
};
