import "@/utils/axios";
import { MeResponse, UpdateUserResponse } from "@/types/responses";
import axios from "axios";
import { EditUserRequest } from "@/types/requests";
import { UserRoleEnum } from "@/types/user";

export default class UsersApi {
  async updateUser(input: EditUserRequest): Promise<UpdateUserResponse> {
    const fd = new FormData();
    fd.append("userId", input.userId.toString());
    fd.append("firstName", input.firstName);
    fd.append("lastName", input.lastName);
    fd.append("email", input.email);
    fd.append("onboardingCompleted", input.onboardingCompleted.toString());
    // @ts-ignore
    fd.append("newLogo", input.newLogo);
    fd.append("role", input.role);
    const { data } = await axios.post("/users/update", fd);
    return data;
  }

  async getMe(): Promise<MeResponse> {
    const { data } = await axios.post("/auth/me");
    return data;
  }
}
