import "@/utils/axios";
import {
  AddUserToOrganizationResponse,
  CreateOrganizationResponse,
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
  async getOrganizationById(
    organizationId: number
  ): Promise<GetOrganizationByIdResponse> {
    const { data } = await axios.get(`/organizations/${organizationId}`);
    return data;
  }
}
