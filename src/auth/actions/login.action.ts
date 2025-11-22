import tesloApi from "@/api/tesloApi";
import type { AuthResponse } from "../interface/auth.response";

export const loginAction = async (email: string, password: string) => {
  try {
    const {data} = await tesloApi.post<AuthResponse>('/auth/login', {email, password});
    return data
  } catch (error) {
    console.error(error);
    throw new Error('Error al iniciar session')
  }
}