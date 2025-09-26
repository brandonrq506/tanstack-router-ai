import { apiV1 } from "@/integrations/axios";

import type { QueryFunctionContext } from "@tanstack/react-query";
import type { TaskRecord } from "../../types/task-record";
import type { taskKeys } from "../queries/queries";

export const getTask = async ({
	signal,
	queryKey,
}: QueryFunctionContext<ReturnType<(typeof taskKeys)["detail"]>>) => {
	const [{ resource, taskId }] = queryKey;
	const URL = `${resource}/${taskId}`;

	const response = await apiV1.get<TaskRecord>(URL, { signal });
	return response.data;
};
