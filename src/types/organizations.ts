export interface Organization {
  id: number;
  name: string;
  subdomain: string;
}

export interface OrganizationState {
  organization: Organization | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface OrganizationUser {
  organizationId: number;
  userId: number;
}
