import type { TaskCompleted } from "../types/task-completed";
import type { TaskRecord } from "../types/task-record";

export const isTaskCompleted = (task: TaskRecord): task is TaskCompleted =>
	task.status === "completed";
