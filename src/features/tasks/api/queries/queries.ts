import { TASKS_ENDPOINT } from "@/integrations/axios";
import { queryOptions } from "@tanstack/react-query";
import { getTask } from "../axios/get-task";
import { getTasks } from "../axios/get-tasks";

import type { TaskApiPreferences } from "../../types/task-api-preferences";
import type { TaskCompleted } from "../../types/task-completed";
import type { TaskInProgress } from "../../types/task-in-progress";
import type { TaskScheduled } from "../../types/task-scheduled";

export const taskKeys = {
	all: [{ resource: TASKS_ENDPOINT }] as const,
	lists: () => [{ ...taskKeys.all[0], entity: "list" }] as const,
	list: ({ filter = {}, sort = {} }: TaskApiPreferences) =>
		[{ ...taskKeys.lists()[0], filter, sort }] as const,
	details: () => [{ ...taskKeys.all[0], entity: "details" }] as const,
	detail: (taskId: string) => [{ ...taskKeys.details()[0], taskId }] as const,
};

export const scheduledTasksQueryOptions = () => {
	return queryOptions({
		queryKey: taskKeys.list({
			filter: { status: "scheduled" },
			sort: { sort_by: "position", sort_order: "asc" },
		}),
		queryFn: getTasks<TaskScheduled[]>,
	});
};

export const inProgressTasksQueryOptions = () => {
	return queryOptions({
		queryKey: taskKeys.list({ filter: { status: "in_progress" } }),
		queryFn: getTasks<TaskInProgress[]>,
	});
};

export const todayCompletedTasksQueryOptions = () => {
	return queryOptions({
		queryKey: taskKeys.list({
			filter: { status: "completed", start_time: "today" },
			sort: { sort_by: "start_time", sort_order: "desc" },
		}),
		queryFn: getTasks<TaskCompleted[]>,
	});
};

export const taskByIdQueryOptions = (taskId: string) => {
	return queryOptions({
		queryKey: taskKeys.detail(taskId),
		queryFn: getTask,
	});
};

export const historyTasksQueryOptions = (date: string) => {
	return queryOptions({
		queryKey: taskKeys.list({
			filter: { status: "completed", start_time: date },
			sort: { sort_by: "start_time", sort_order: "asc" },
		}),
		queryFn: getTasks<TaskCompleted[]>,
	});
};
