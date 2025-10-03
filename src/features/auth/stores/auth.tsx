import { type PropsWithChildren, useCallback, useState } from "react";

import { apiV1 } from "@/integrations/axios";
import { AxiosHeaders } from "axios";
import { AuthContext } from "./auth-context";

const key = "token";

const logoutRef: { current: () => void } = {
	current: () => {},
};

let interceptorsRegistered = false;

const getStoredToken = () => localStorage.getItem(key);

const setStoredToken = (token: string | null) => {
	if (token) localStorage.setItem(key, token);
	else localStorage.removeItem(key);
};

const ensureAuthInterceptors = () => {
	if (interceptorsRegistered) return;

	apiV1.interceptors.request.use((config) => {
		const token = getStoredToken();
		if (!token) return config;

		if (!config.headers) {
			config.headers = new AxiosHeaders();
		}

		if (config.headers instanceof AxiosHeaders) {
			config.headers.set("Authorization", `Bearer ${token}`);
			return config;
		}

		(config.headers as Record<string, string>).Authorization =
			`Bearer ${token}`;
		return config;
	});

	apiV1.interceptors.response.use(
		(response) => response,
		(error) => {
			const UNAUTHORIZED = 401;
			if (error.response?.status === UNAUTHORIZED) {
				logoutRef.current();
			}
			return Promise.reject(error);
		},
	);

	interceptorsRegistered = true;
};

ensureAuthInterceptors();

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState(getStoredToken());

	const logout = useCallback(() => {
		setStoredToken(null);
		setToken(null);
	}, []);

	const login = useCallback((newToken: string) => {
		setStoredToken(newToken);
		setToken(newToken);
	}, []);

	logoutRef.current = logout;

	return (
		<AuthContext.Provider value={{ isAuth: Boolean(token), login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
