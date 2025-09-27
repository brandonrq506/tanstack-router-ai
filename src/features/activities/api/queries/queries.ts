import { ACTIVITIES_ENDPOINT } from "@/integrations/axios";
import { queryOptions } from "@tanstack/react-query";
import { getActivities } from "../axios/getActivities";
import { getActivity } from "../axios/getActivity";

export const activityKeys = {
	all: [{ resource: ACTIVITIES_ENDPOINT }] as const,
	lists: () => [{ ...activityKeys.all[0], entity: "list" }] as const,
	details: () => [{ ...activityKeys.all[0], entity: "details" }] as const,
	detail: (activityId: string) =>
		[{ ...activityKeys.details()[0], activityId }] as const,
};

export const activityByIdQueryOptions = (activityId: string) => {
	return queryOptions({
		queryKey: activityKeys.detail(activityId),
		queryFn: getActivity,
	});
};

export const activityListQueryOptions = () => {
	return queryOptions({
		queryKey: activityKeys.lists(),
		queryFn: getActivities,
	});
};
