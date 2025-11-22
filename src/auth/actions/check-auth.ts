import tesloApi from "@/api/tesloApi";
import type { AuthResponse } from "../interface/auth.response";

export async function checkAuthAction(): Promise<AuthResponse> {
  const token = localStorage.getItem('token');

  // ← Cambia esto
  if (!token) {
    throw new Error('NO-AUTH');  // ← Ahora sí coincide con tu condición
  }

  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    throw new Error('NO-AUTH');  // ← También aquí unificamos el error
  }
}