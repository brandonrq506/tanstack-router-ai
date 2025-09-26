import type { TaskRecord } from "../types/task-record";
import type { TaskScheduled } from "../types/task-scheduled";

export const isTaskScheduled = (task: TaskRecord): task is TaskScheduled =>
	task.status === "scheduled";
