import type { TaskStatus } from "./task-status";
import type { TaskStatusMap } from "./task-status-map";

export type TaskRecord = TaskStatusMap[TaskStatus];
