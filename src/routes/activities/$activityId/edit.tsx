import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Modal } from "@/components/core";
import { activityByIdQueryOptions } from "@/features/activities/api/queries/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities/$activityId/edit")({
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
			<h2>Editing activity {data.name}</h2>
			<p>Activities time: {data.exp_seconds}</p>
		</Modal>
	);
}
