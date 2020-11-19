import { Locale } from "./locales";
import { Organization, OrganizationUser } from "./organizations";
import { Project } from "./projects";
import { Translation } from "./translations";
import { User } from "./user";

export interface AuthenticateResponse extends BaseResponse {
  data: {
    access_token: string;
    token_type: "bearer";
    expires_in: string;
    user: User;
  };
}

export interface BaseResponse {
  success: boolean;
  data: any;
}

export interface LogoutResponse extends BaseResponse {}

export interface UpdateUserResponse extends BaseResponse {
  data: User;
}

export interface CreateOrganizationResponse extends BaseResponse {
  data: Organization;
}

export interface AddUserToOrganizationResponse extends BaseResponse {
  data: OrganizationUser;
}

export interface MeResponse extends BaseResponse {
  data: User;
}

export interface GetOrganizationByIdResponse extends BaseResponse {
  data: Organization;
}

export interface GetProjectsResponse extends BaseResponse {
  data: Project[];
}

export interface CreateProjectResponse extends BaseResponse {
  data: Project;
}

export interface GetAllLocalesResponse extends BaseResponse {
  data: Locale[];
}

export interface GetTranslationsResponse extends BaseResponse {
  data: Translation[];
}

export interface CreateTranslationResponse extends BaseResponse {
  data: Translation;
}

export interface DeleteProjectResponse extends BaseResponse {
  data: null;
}

export interface FetchProjectResponse extends BaseResponse {
  data: Project;
}
