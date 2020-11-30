import "@/utils/axios";
import { GetDashboardTotalsResponse } from "@/types/responses";
import axios from "axios";

export default class TotalsApi {
  async getDashboardTotals(
    organizationId: number
  ): Promise<GetDashboardTotalsResponse> {
    const { data } = await axios.get(
      `/totals?organizationId=${organizationId}`
    );
    return data;
  }
}
