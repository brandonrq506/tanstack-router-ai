import { ACTIVITIES_ENDPOINT, apiV1 } from "@/integrations/axios";

import type { ActivityModel } from "../../types/activity-model";
import type { ActivityUpdatePayload } from "../../types/activity-update-payload";

type Props = {
	activity: ActivityUpdatePayload;
	activityId: number;
};

export const updateActivity = async ({ activityId, activity }: Props) => {
	const URL = `${ACTIVITIES_ENDPOINT}/${activityId}`;

	const response = await apiV1.patch<ActivityModel>(URL, activity);
	return response.data;
};
