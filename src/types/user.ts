import { Organization } from "./organizations";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  onboardingCompleted: boolean;
  organizations: Organization[];
}
