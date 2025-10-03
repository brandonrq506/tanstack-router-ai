import { useEffect, useState } from "react";

import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/activities/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = Route.useNavigate();

	useEffect(() => setIsOpen(true), []);

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => navigate({ to: "..", from: Route.id })}>
			Hello "/activities/new"!
		</Modal>
	)
}
