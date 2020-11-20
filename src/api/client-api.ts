import "@/utils/axios";
import { GetAllLocalesResponse } from "@/types/responses";
import axios from "axios";

export default class ClientApi {
  async getAllLocales(): Promise<GetAllLocalesResponse> {
    const { data } = await axios.get(
      "/client/translations?organizationId=76&projectId=21&token=2da5ea-f06289-669387-be1f2e-6927b3"
    );
    return data;
  }
}
