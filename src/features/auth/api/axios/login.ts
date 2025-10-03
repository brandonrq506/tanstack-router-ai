import { SESSION_ENDPOINT, apiV1 } from "@/integrations/axios";
import type { LoginPayload } from "../../types/login-payload";

type Response = {
	token: string;
};

export const login = async (formValues: LoginPayload) => {
	const response = await apiV1.post<Response>(SESSION_ENDPOINT, formValues);
	return response.data;
};
