import { EloquentModel } from "./common";

export interface Locale extends EloquentModel {
  name: string;
  iso: string;
  pivot: {
    isMainLocale: boolean;
  };
}
