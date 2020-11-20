export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  userId: number;
}

export interface CreateOrganizationInput {
  name: string;
  subdomain: string;
}

export interface CreateProjectRequest {
  name: string;
  organizationId: number;
  mainLocaleId: number;
  localeIds: number[];
}

export interface CreateTranslationRequest {
  transKey: string;
  transValue: string;
  localeId: number;
  organizationId: number;
  userId: number;
  projectId: number;
}

export interface UpdateTranslationRequest {
  translationId?: number;
  transKey: string;
  transValue: string;
  localeId: number;
  organizationId: number;
  userId: number;
  projectId: number;
}
