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
