import type { SortDirection } from "@tanstack/react-table";
import type { TaskModel } from "./task-model";
import type { TaskStatus } from "./task-status";

// Filters available for the tasks API endpoint
interface TaskApiFilters {
	status: TaskStatus;
	category_id: number;
	created_at: string;
	end_time: string;
	start_time: string;
}

// Fields of TaskModel that can be used for sorting
type TaskSortableField = Extract<keyof TaskModel, string>;

interface TaskSortPreferences {
	sort_by: TaskSortableField;
	sort_order: SortDirection;
}

export interface TaskApiPreferences {
	sort?: Partial<TaskSortPreferences>;
	filter?: Partial<TaskApiFilters>;
}
