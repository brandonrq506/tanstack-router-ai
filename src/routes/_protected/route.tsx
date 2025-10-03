import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuth) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			})
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_protected"!</div>;
}
