import { EloquentModel, Pagination } from "./common";
import { Locale } from "./locales";
import { Organization } from "./organizations";
import { Project } from "./projects";
import { User } from "./user";

export interface Translation extends EloquentModel {
  transKey: string;
  transValue: string;
  localeId: number;
  locale: Locale;
  organizationId: number;
  organization: Organization;
  userId: number;
  user: User;
  projectId: number;
  project: Project;
}

export interface TranslationGroup {
  [key: string]: Translation[];
}

export interface TranslationsState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  activeTranslation: Translation | null;
  translations: TranslationGroup;
  selectedTranslations: string[];
  pagination: Pagination;
}
