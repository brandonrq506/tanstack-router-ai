import type { TaskBase } from "./internal/task-base";
import type { TaskStatus } from "./task-status";

export interface TaskModel extends TaskBase {
	activity_id: number;
	end_time: string | null;
	position: number | null;
	start_time: string | null;
	status: TaskStatus;
}
