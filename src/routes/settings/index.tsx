import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
	component: RouteComponent,
	beforeLoad: () => redirect({ to: "/settings/account" }),
});

function RouteComponent() {
	return <div>You should never see this.</div>;
}
