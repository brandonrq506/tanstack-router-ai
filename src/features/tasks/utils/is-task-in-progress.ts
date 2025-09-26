import type { TaskInProgress } from "../types/task-in-progress";
import type { TaskRecord } from "../types/task-record";

export const isTaskInProgress = (task: TaskRecord): task is TaskInProgress =>
	task.status === "in_progress";
