import { SESSION_ENDPOINT, apiV1 } from "@/integrations/axios";

export const logout = async () => {
	await apiV1.delete(SESSION_ENDPOINT);
};
