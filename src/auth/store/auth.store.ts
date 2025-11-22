import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth";
import { registerAction } from "../actions/register.action";

// Creación de un status
type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
	//Properties
	user: User | null;
	token: string | null;
	authStatus: AuthStatus;
	// Getters
	isAdmin: () => boolean;

	// Actions
	login: (email: string, password: string) => Promise<boolean>;
	register: (email: string, password: string, fullName: string) => Promise<boolean>;
	logout: () => void;
	checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
	//Implementación del store
	user: null,
	token: null,
	authStatus: "checking",
	
	// Getters
	isAdmin: () => {
		const roles = get().user?.roles || [];
		return roles.includes("admin");
		//? Todo lo de arriba se puede interpretar en una sola linea
		// return !!get().user?.roles?.includes("admin")
	},
	//Actions
	login: async (email, password) => {
		try {
			const data = await loginAction(email, password);
			localStorage.setItem("token", data.token);
			// Para guardar el estado y causar el render
			set({ user: data.user, token: data.token, authStatus: "authenticated" });
			return true;
		} catch (error) {
			set({ user: null, token: null, authStatus: "not-authenticated" });
			localStorage.removeItem("token");
			console.error(error);
			return false;
		}
	},
	logout: () => {
		set({ user: null, token: null, authStatus: "not-authenticated" });
		localStorage.removeItem("token");

	},

	checkAuthStatus: async () => {
		try {
			const { user, token } = await checkAuthAction();
			set({ user, token, authStatus: "authenticated" });
			return true;
		} catch (error) {
			console.error(error);
			localStorage.removeItem("token");
			set({ user: null, token: null, authStatus: "not-authenticated" });
			return false;
		}
	},
	register: async (email, password, fullName) => {
		try {
			const data = await registerAction(email, password, fullName);
			localStorage.setItem("token", data.token);
			// Para guardar el estado y causar el render
			set({ user: data.user, token: data.token, authStatus: "authenticated" });
			return true;
		} catch (error) {
			set({ user: null, token: null, authStatus: "not-authenticated" });
			localStorage.removeItem("token");
			console.error(error);
			return false;
		}
	}
}));
