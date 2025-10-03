import { isHtmlResponse } from "@/utils";
import axios from "axios";

import type { AxiosError, AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Added hardcoded API token
const API_TOKEN = "ebcf334ac8a97558d1f3815ccbaf142edb4dc40a";

export const apiV1 = axios.create({
	baseURL: `${API_URL}/v1`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${API_TOKEN}`,
	},
});

// Response interceptor to reject HTML responses
apiV1.interceptors.response.use(
	(response: AxiosResponse) => {
		if (isHtmlResponse(response.headers)) {
			return Promise.reject(
				new Error("Received HTML response when JSON was expected"),
			);
		}

		return response;
	},
	(error: AxiosError) => {
		if (error.response && isHtmlResponse(error.response.headers)) {
			return Promise.reject(
				new Error("Received HTML error response when JSON was expected"),
			);
		}

		return Promise.reject(error);
	},
);

// ENDPOINTS
export const ACTIVITIES_ENDPOINT = "/activities";
export const CATEGORIES_ENDPOINT = "/categories";
export const EXCEL_ENDPOINT = "/excel";
export const ME_ENDPOINT = "/me";
export const ROUTINES_ENDPOINT = "/routines";
export const SESSION_ENDPOINT = "/session";
export const TASKS_ENDPOINT = "/tasks";
export const USER_PREFERENCES_ENDPOINT = "/user_preferences";
export const USERS_ENDPOINT = "/users";
