import { apiV1 } from "@/integrations/axios";
import type { activityKeys } from "../queries/queries";

import type { QueryFunctionContext } from "@tanstack/react-query";
import type { ActivityModel } from "../../types/activity-model";

export const getActivities = async ({
	signal,
	queryKey,
}: QueryFunctionContext<ReturnType<typeof activityKeys.lists>>) => {
	const [{ resource }] = queryKey;

	const response = await apiV1.get<ActivityModel[]>(resource, { signal });
	return response.data;
};
