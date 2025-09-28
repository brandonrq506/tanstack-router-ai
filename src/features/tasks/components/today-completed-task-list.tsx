import { useQuery } from "@tanstack/react-query";
import { todayCompletedTasksQueryOptions } from "../api/queries/queries";

export function TodayCompletedTaskList() {
	const { data, isPending, isError, error, refetch, isFetching } = useQuery(
		todayCompletedTasksQueryOptions(),
	);

	if (isPending) {
		return (
			<div className="rounded border p-4">
				<div className="h-5 w-40 animate-pulse bg-gray-200" />
				<div className="mt-2 h-4 w-full max-w-[280px] animate-pulse bg-gray-100" />
				<div className="mt-2 h-4 w-full max-w-[220px] animate-pulse bg-gray-100" />
			</div>
		);
	}

	if (isError) {
		const message = error instanceof Error ? error.message : String(error);
		return (
			<div className="rounded border p-4 text-red-700">
				<div>Failed to load today's completed tasks.</div>
				<div className="text-xs opacity-70">{message}</div>
				<button
					type="button"
					className="mt-2 rounded bg-red-600 px-3 py-1 text-white"
					onClick={() => refetch()}>
					Retry
				</button>
			</div>
		);
	}

	const tasks = data ?? [];

	return (
		<div className="rounded border p-4">
			<div className="flex items-center justify-between">
				<h3 className="text-base font-semibold">Completed Today</h3>
				{isFetching ? (
					<span className="text-xs opacity-60">Updating…</span>
				) : null}
			</div>
			{tasks.length === 0 ? (
				<p className="mt-2 text-sm opacity-80">No completed tasks yet.</p>
			) : (
				<ul className="mt-2 list-disc pl-5">
					{tasks.map((t) => (
						<li key={t.id}>{t.activity.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
