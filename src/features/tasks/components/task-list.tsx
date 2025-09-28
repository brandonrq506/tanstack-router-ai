import { useSuspenseQuery } from "@tanstack/react-query";
import { historyTasksQueryOptions } from "../api/queries/queries";

interface Props {
	date: string;
}

export const TaskList = ({ date }: Props) => {
	const { data } = useSuspenseQuery(historyTasksQueryOptions(date));

	const isEmpty = data.length === 0;

	if (isEmpty) return <div>No tasks found for {date}</div>;

	return (
		<ul>
			{data.map((task) => (
				<li key={task.id}>{task.activity.name}</li>
			))}
		</ul>
	);
};
