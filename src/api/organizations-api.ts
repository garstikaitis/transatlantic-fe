import "@/utils/axios";
import {
  AddUserToOrganizationResponse,
  CreateOrganizationResponse,
  GetFetchApiKeyForProjectResponse,
  GetOrganizationByIdResponse,
} from "@/types/responses";
import { EditOrganizationRequest } from "@/types/requests";
import axios from "axios";

export default class OrganizationsApi {
  async createOrganization(
    name: string,
    subdomain: string,
    logo: File
  ): Promise<CreateOrganizationResponse> {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("subdomain", subdomain);
    fd.append("logo", logo);
    const { data } = await axios.post("/organizations", fd, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return data;
  }
  async editOrganization(input: EditOrganizationRequest) {
    const fd = new FormData();
    fd.append("name", input.name);
    fd.append("subdomain", input.subdomain);
    fd.append("newLogo", input.newLogo!);
    fd.append("organizationId", input.organizationId);
    const { data } = await axios.post(
      `/organizations/edit/${input.organizationId}`,
      fd,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
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
