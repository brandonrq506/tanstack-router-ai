import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/account")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/settings/account"!</div>;
}
