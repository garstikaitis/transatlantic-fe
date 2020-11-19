import "@/utils/axios";
import axios from "axios";
import { CreateTranslationRequest } from "@/types/requests";
import {
  GetTranslationsResponse,
  CreateTranslationResponse,
} from "@/types/responses";

export default class ProjectsApi {
  async getTranslations(projectId: number): Promise<GetTranslationsResponse> {
    const { data } = await axios.post("/translations", { projectId });
    return data;
  }

  async createTranslation(
    input: CreateTranslationRequest
  ): Promise<CreateTranslationResponse> {
    const { data } = await axios.post("/translations/create", { ...input });
    return data;
  }

  async updateTranslation(
    input: CreateTranslationRequest
  ): Promise<CreateTranslationResponse> {
    const { data } = await axios.post("/translations/update", { ...input });
    return data;
  }
}
