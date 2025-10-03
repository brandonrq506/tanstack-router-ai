import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Modal } from "@/components/core";
import { activityByIdQueryOptions } from "@/features/activities/api/queries/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/activities/$activityId/delete")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = Route.useNavigate();
	const { activityId } = Route.useParams();

	useEffect(() => setIsOpen(true), []);

	// This would be used in a `EditActivityForm` component.
	const { data } = useSuspenseQuery(activityByIdQueryOptions(activityId));

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => navigate({ to: "../..", from: Route.id, replace: true })}>
			<h2>Are you sure you want to delete: {data.name}?</h2>
		</Modal>
	)
}
