import type { TaskWithActivity } from "./internal/task-with-activity";

export interface TaskCompleted extends TaskWithActivity {
	status: "completed";
	start_time: string;
	end_time: string;
	position: null;
}
