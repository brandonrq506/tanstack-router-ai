import {
	inProgressTasksQueryOptions,
	scheduledTasksQueryOptions,
	todayCompletedTasksQueryOptions,
} from "@/features/tasks/api/queries/queries";
import { ScheduledTaskList } from "@/features/tasks/components/scheduled-task-list";
import { TimerPanel } from "@/features/tasks/components/timer-panel";
import { TodayCompletedTaskList } from "@/features/tasks/components/today-completed-task-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/")({
	component: App,
	// Warm the cache for all three without blocking the route render.
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery(inProgressTasksQueryOptions()).catch(() => {});
		queryClient.prefetchQuery(scheduledTasksQueryOptions()).catch(() => {});
		queryClient
			.prefetchQuery(todayCompletedTasksQueryOptions())
			.catch(() => {});
	},
});

function App() {
	return (
		<div className="p-4">
			<TimerPanel />
			<br />
			<div className="grid gap-5 md:grid-cols-2">
				<ScheduledTaskList />
				<TodayCompletedTaskList />
			</div>
		</div>
	);
}
