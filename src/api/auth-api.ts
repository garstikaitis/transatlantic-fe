import "@/utils/axios";
import { AuthenticateResponse, LogoutResponse } from "@/types/responses";
import axios from "axios";

export default class AuthApi {
  async authenticate(
    email: string,
    password: string
  ): Promise<AuthenticateResponse> {
    const { data } = await axios.post("/login", { email, password });
    return data;
  }
  async register(
    email: string,
    password: string
  ): Promise<AuthenticateResponse> {
    const { data } = await axios.post("/register", { email, password });
    return data;
  }
  async logout(): Promise<LogoutResponse> {
    const { data } = await axios.post("/auth/logout");
    return data;
  }
  async refreshToken(): Promise<AuthenticateResponse> {
    const { data } = await axios.post("/auth/refresh");
    return data;
  }
}
