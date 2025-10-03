import Header from "@/components/Header";
import { useLogout } from "@/features/auth/api/tanstack/useLogout";
import {
	Outlet,
	createFileRoute,
	redirect,
	useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuth) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { mutateAsync } = useLogout();

	const router = useRouter();
	const navigate = Route.useNavigate();

	const handleLogout = async () => {
		await mutateAsync();

		await router.invalidate();

		await navigate({ to: "/login" });
	};

	return (
		<>
			<Header />
			<button
				type="button"
				onClick={handleLogout}
				className="bg-red-500 text-white py-2 px-4 rounded-md">
				Logout
			</button>
			<Outlet />
		</>
	);
}
