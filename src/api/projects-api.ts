import "@/utils/axios";
import { CreateProjectResponse, GetProjectsResponse } from "@/types/responses";
import axios from "axios";

export default class ProjectsApi {
  async getProjects(organizationId: number): Promise<GetProjectsResponse> {
    const { data } = await axios.post("/projects", { organizationId });
    return data;
  }

  async createProject(): Promise<CreateProjectResponse> {
    const { data } = await axios.post("/projects/create");
    return data;
  }
}
