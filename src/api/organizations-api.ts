import "@/utils/axios";
import {
  AddUserToOrganizationResponse,
  CreateOrganizationResponse,
  GetFetchApiKeyForProjectResponse,
  GetOrganizationByIdResponse,
} from "@/types/responses";
import axios from "axios";

export default class OrganizationsApi {
  async createOrganization(
    name: string,
    subdomain: string
  ): Promise<CreateOrganizationResponse> {
    const { data } = await axios.post("/organizations", {
      name,
      subdomain,
    });
    return data;
  }
  async addUserToOrganization(
    userId: number,
    organizationId: number
  ): Promise<AddUserToOrganizationResponse> {
    const { data } = await axios.post("/organizations/user", {
      userId,
      organizationId,
    });
    return data;
  }
  async getUserOrganizations() {
    const { data } = await axios.get("/organizations/user");
    return data;
  }
  async getOrganizationById(
    organizationId: number
  ): Promise<GetOrganizationByIdResponse> {
    const { data } = await axios.get(`/organizations/${organizationId}`);
    return data;
  }
  async fetchApiKeyForProject(
    projectId: number,
    organizationId: number
  ): Promise<GetFetchApiKeyForProjectResponse> {
    const { data } = await axios.get(
      `/organizations/settings/api-keys?projectId=${projectId}&organizationId=${organizationId}`
    );
    return data;
  }
  async generateApiKeyForProject(
    projectId: number,
    organizationId: number
  ): Promise<GetFetchApiKeyForProjectResponse> {
    const { data } = await axios.post(`/organizations/settings/api-keys`, {
      organizationId,
      projectId,
    });
    return data;
  }
}
