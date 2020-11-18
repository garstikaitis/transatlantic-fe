import { AuthState } from "./auth";
import { OrganizationState } from "./organizations";
import { ProjectsState } from "./projects";

export interface RootState {
  auth: AuthState;
  organizations: OrganizationState;
  projects: ProjectsState;
}
