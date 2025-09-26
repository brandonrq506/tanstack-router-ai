import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import type { TaskBase } from "./task-base";

// Never use this directly, use 'TaskRecord' instead.
export interface TaskWithActivity extends TaskBase {
	activity: ActivityWithCategory;
}
