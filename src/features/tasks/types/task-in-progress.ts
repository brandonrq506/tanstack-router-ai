import type { TaskWithActivity } from "./internal/task-with-activity";

export interface TaskInProgress extends TaskWithActivity {
	status: "in_progress";
	start_time: string;
	end_time: null;
	position: null;
}
