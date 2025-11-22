import tesloApi from "@/api/tesloApi";
import type { AuthResponse } from "../interface/auth.response";

export const registerAction = async (
	email: string,
	password: string,
	fullName: string
) => {
	try {
		const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
			email,
			password,
			fullName,
		});
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Error al iniciar session");
	}
};
