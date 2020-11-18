export interface ProjectsState {
  activeProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface Project {
  id: number;
  name: string;
}
