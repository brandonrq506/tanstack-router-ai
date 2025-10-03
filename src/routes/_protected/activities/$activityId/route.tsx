import { activityByIdQueryOptions } from "@/features/activities/api/queries/queries";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/activities/$activityId")({
	component: RouteComponent,
	loader: ({ context: { queryClient }, params: { activityId } }) =>
		queryClient.ensureQueryData(activityByIdQueryOptions(activityId)),
});

function RouteComponent() {
	return <Outlet />;
}
