import "@/utils/axios";
import { GetAllLocalesResponse } from "@/types/responses";
import axios from "axios";

export default class LocalesApi {
  async getAllLocales(): Promise<GetAllLocalesResponse> {
    const { data } = await axios.get("/locales");
    return data;
  }
}
