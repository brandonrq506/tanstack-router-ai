import type { TaskWithActivity } from "./internal/task-with-activity";

export interface TaskScheduled extends TaskWithActivity {
	status: "scheduled";
	start_time: null;
	end_time: null;
	position: number;
}
