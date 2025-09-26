import type { TaskCompleted } from "./task-completed";
import type { TaskInProgress } from "./task-in-progress";
import type { TaskScheduled } from "./task-scheduled";

export interface TaskStatusMap {
	scheduled: TaskScheduled;
	in_progress: TaskInProgress;
	completed: TaskCompleted;
}
