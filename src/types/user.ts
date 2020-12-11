import { Organization } from "./organizations";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  onboardingCompleted: boolean;
  image?: string;
  organizations: Organization[];
  role: UserRoleEnum;
  logo: string | null;
}

export enum UserRoleEnum {
  SUPERADMIN = "SUPERADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}
