import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1>Settings</h1>
			<nav className="flex gap-5">
				<Link
					to="/settings/account"
					className="hover:underline"
					activeProps={{ className: "font-bold" }}
					activeOptions={{ exact: false }}>
					Account
				</Link>
				<Link
					to="/settings/categories"
					className="hover:underline"
					activeProps={{ className: "font-bold" }}
					activeOptions={{ exact: false }}>
					Categories
				</Link>
				<Link
					to="/settings/notifications"
					className="hover:underline"
					activeProps={{ className: "font-bold" }}
					activeOptions={{ exact: false }}>
					Notifications
				</Link>
			</nav>
			<br />
			<Outlet />
		</div>
	);
}
