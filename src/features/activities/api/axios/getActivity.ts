import { apiV1 } from "@/integrations/axios";
import type { activityKeys } from "../queries/queries";

import type { QueryFunctionContext } from "@tanstack/react-query";
import type { ActivityModel } from "../../types/activity-model";

export const getActivity = async ({
	signal,
	queryKey,
}: QueryFunctionContext<ReturnType<(typeof activityKeys)["detail"]>>) => {
	const [{ resource, activityId }] = queryKey;
	const URL = `${resource}/${activityId}`;

	const response = await apiV1.get<ActivityModel>(URL, { signal });
	return response.data;
};
