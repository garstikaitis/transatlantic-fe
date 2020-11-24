import "@/utils/axios";
import axios from "axios";
import {
  CreateTranslationRequest,
  UpdateTranslationRequest,
  UploadTranslationsFromFileRequest,
} from "@/types/requests";
import {
  GetTranslationsResponse,
  CreateTranslationResponse,
  UploadTranslationsFromFileResponse,
} from "@/types/responses";

export default class ProjectsApi {
  async getTranslations(
    projectId: number,
    searchValue?: string
  ): Promise<GetTranslationsResponse> {
    const { data } = await axios.post("/translations", {
      projectId,
      searchValue,
    });
    return data;
  }

  async createTranslation(
    input: CreateTranslationRequest
  ): Promise<CreateTranslationResponse> {
    const { data } = await axios.post("/translations/create", {
      ...input,
    });
    return data;
  }

  async updateTranslation(
    input: UpdateTranslationRequest
  ): Promise<CreateTranslationResponse> {
    const { data } = await axios.post("/translations/update", {
      ...input,
    });
    return data;
  }

  async uploadTranslationsFromFile(
    input: UploadTranslationsFromFileRequest
  ): Promise<UploadTranslationsFromFileResponse> {
    const fd = new FormData();
    fd.append("organizationId", input.organizationId);
    fd.append("projectId", input.projectId);
    fd.append("file", input.file);
    const { data } = await axios.post("/translations/upload", fd);
    return data;
  }
}
