import { apiV1 } from "@/integrations/axios";

import type { QueryFunctionContext } from "@tanstack/react-query";
import type { TaskRecord } from "../../types/task-record";
import type { taskKeys } from "../queries/queries";

export async function getTasks<T = TaskRecord[]>({
	signal,
	queryKey,
}: QueryFunctionContext<ReturnType<typeof taskKeys.list>>): Promise<T> {
	const [{ resource, filter, sort }] = queryKey;
	const response = await apiV1.get<T>(resource, {
		signal,
		params: {
			filter,
			sort,
			misc: {
				time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			},
		},
	});
	return response.data;
}
