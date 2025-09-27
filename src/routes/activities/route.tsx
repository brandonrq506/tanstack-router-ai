import { activityListQueryOptions } from "@/features/activities/api/queries/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities")({
	component: RouteComponent,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(activityListQueryOptions()),
});

function RouteComponent() {
	const { data } = useSuspenseQuery(activityListQueryOptions());

	return (
		<div>
			<h1>Activities Page</h1>
			<Link to="/activities/new" className="bg-blue-400 py-2 px-4 rounded-md">
				Create New Activity
			</Link>
			<h2>Activities List</h2>
			<br />
			<ul>
				{data.map((activity) => (
					<li key={activity.id}>{activity.name}</li>
				))}
			</ul>
			<Outlet />
		</div>
	);
}
