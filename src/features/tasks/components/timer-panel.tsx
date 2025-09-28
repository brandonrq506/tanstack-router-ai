import { useQuery } from "@tanstack/react-query";
import { inProgressTasksQueryOptions } from "../api/queries/queries";

export function TimerPanel() {
	const { data, isPending, isError, error, refetch, isFetching } = useQuery(
		inProgressTasksQueryOptions(),
	);

	if (isPending) {
		return (
			<div className="rounded border p-4">
				<div className="h-6 w-48 animate-pulse bg-gray-200" />
				<div className="mt-2 h-4 w-64 animate-pulse bg-gray-100" />
			</div>
		);
	}

	if (isError) {
		const message = error instanceof Error ? error.message : String(error);
		return (
			<div className="rounded border p-4 text-red-700">
				<div>Failed to load in-progress tasks.</div>
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

	const count = data?.length ?? 0;

	return (
		<div className="rounded border p-4">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Timer</h2>
				{isFetching ? (
					<span className="text-xs opacity-60">Updating…</span>
				) : null}
			</div>
			{count === 0 ? (
				<p className="mt-2 text-sm opacity-80">No tasks in progress.</p>
			) : (
				<ul className="mt-2 list-disc pl-5">
					{(data ?? []).map((t) => (
						<li key={t.id}>{t.activity.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
