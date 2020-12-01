import { AuthState } from "./auth";
import { OrganizationState } from "./organizations";
import { ProjectsState } from "./projects";

export interface RootState {
  auth: AuthState;
  organizations: OrganizationState;
  projects: ProjectsState;
}

export interface EloquentModel {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface IRenderTranslation extends Record<string, any> {
  [key: string]: {
    translationId: number | null;
    value: string;
    locale: string;
    localeId: number;
    isMainLocale: boolean;
  };
}

export interface IframeEvent {
  text: string;
}

export interface Link {
  name: string;
  displayName: string;
  params?: object;
}
