import "@/utils/axios";
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  FetchProjectResponse,
  GetProjectsResponse,
} from "@/types/responses";
import axios from "axios";
import { CreateProjectRequest } from "@/types/requests";

export default class ProjectsApi {
  async getProjects(organizationId: number): Promise<GetProjectsResponse> {
    const { data } = await axios.post("/projects", { organizationId });
    return data;
  }

  async createProject(
    input: CreateProjectRequest
  ): Promise<CreateProjectResponse> {
    const { data } = await axios.post("/projects/create", { ...input });
    return data;
  }

  async fetchProject(projectId: number): Promise<FetchProjectResponse> {
    const { data } = await axios.get(`/projects/${projectId}`);
    return data;
  }

  async deleteProject(projectId: number): Promise<DeleteProjectResponse> {
    const { data } = await axios.post("/projects/delete", { projectId });
    return data;
  }
}
