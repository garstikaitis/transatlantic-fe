export interface Organization {
  id: number;
  name: string;
  subdomain: string;
}

export interface OrganizationState {
  activeOrganization: Organization | null;
  organizations: Organization[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface OrganizationUser {
  organizationId: number;
  userId: number;
}
