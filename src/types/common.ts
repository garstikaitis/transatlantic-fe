import { AuthState } from "./auth";
import { OrganizationState } from "./organizations";
import { ProjectsState } from "./projects";

export interface RootState {
  auth: AuthState;
  organizations: OrganizationState;
  projects: ProjectsState;
  common: CommonState;
}

export interface CommonState {
  prompt: Prompt;
  notification: TransNotification;
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

export interface BaseContextAction {
  name: string;
  displayName: string;
  params?: object;
  type: "link" | "method";
  method?: () => void;
}

export interface TransNotification {
  show: boolean;
  title: string;
  description: string;
}

export interface Prompt {
  show: boolean;
  title: string;
  description: string;
  action: () => void;
}
export interface TransNotification {
  show: boolean;
  title: string;
  description: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
