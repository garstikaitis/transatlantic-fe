import "@/utils/axios";
import { MeResponse, UpdateUserResponse } from "@/types/responses";
import axios from "axios";

export default class UsersApi {
  async updateUser(
    userId: number,
    firstName: string,
    lastName: string,
    onboardingCompleted: boolean
  ): Promise<UpdateUserResponse> {
    const { data } = await axios.post("/users/update", {
      userId,
      firstName,
      lastName,
      onboardingCompleted,
    });
    return data;
  }
  async getMe(): Promise<MeResponse> {
    const { data } = await axios.post("/auth/me");
    return data;
  }
}
