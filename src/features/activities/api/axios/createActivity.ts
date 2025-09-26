import { ACTIVITIES_ENDPOINT, apiV1 } from "@/integrations/axios";

import type { ActivityModel } from "../../types/activity-model";
import type { ActivityPostPayload } from "../../types/activity-post-payload";

export const createActivity = async (activity: ActivityPostPayload) => {
	const response = await apiV1.post<ActivityModel>(
		ACTIVITIES_ENDPOINT,
		activity,
	);
	return response.data;
};
