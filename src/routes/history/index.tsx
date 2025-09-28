import { historyTasksQueryOptions } from "@/features/tasks/api/queries/queries";
import { DateFilterInput } from "@/features/tasks/components/date-filter-input";
import { TaskList } from "@/features/tasks/components/task-list";
import { createFileRoute } from "@tanstack/react-router";
import { format, isValid, parse } from "date-fns";

const today = () => format(new Date(), "yyyy-MM-dd");

interface HistorySearch {
	date: string;
}

export const Route = createFileRoute("/history/")({
	component: RouteComponent,
	validateSearch: (search): HistorySearch => {
		const param = search.date as string | undefined;

		if (!param) return { date: today() };

		if (param === "today") return { date: today() };

		const parsed = parse(param, "yyyy-MM-dd", new Date());
		if (!isValid(parsed)) return { date: today() };
		if (format(parsed, "yyyy-MM-dd") !== param) return { date: today() };

		return {
			date: param,
		};
	},
	loaderDeps: ({ search: { date } }) => ({ date }),
	loader: ({ context: { queryClient }, deps: { date } }) =>
		queryClient.ensureQueryData(historyTasksQueryOptions(date)),
});

function RouteComponent() {
	const { date } = Route.useSearch();

	return (
		<div>
			<h2>Welcome to Task History for {date}</h2>
      <DateFilterInput date={date} />
			<br />
			<TaskList date={date} />
		</div>
	);
}
