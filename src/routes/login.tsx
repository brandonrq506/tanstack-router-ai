import { useLogin } from "@/features/auth/api/tanstack/useLogin";
import { Button } from "@headlessui/react";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";

const HOME_PATH = "/";

interface LoginSearch {
	redirect?: string;
}

export const Route = createFileRoute("/login")({
	validateSearch: (search): LoginSearch => {
		const redirectParam = search.redirect;
		if (typeof redirectParam === "string" && redirectParam.length > 0) {
			return { redirect: redirectParam };
		}
		return {};
	},
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuth) {
			throw redirect({ to: search.redirect ?? HOME_PATH });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { mutateAsync } = useLogin();

	const router = useRouter();
	const navigate = Route.useNavigate();
	const search = Route.useSearch();
	const redirectPath = search.redirect ?? HOME_PATH;

	const onLogin = async () => {
		await mutateAsync({
			email_address: "darkrahd@gmail.com",
			password: "Brandi10",
		});

		await router.invalidate();
		await navigate({ to: redirectPath });
	};

	return (
		<div className="text-center">
			<h1 className="text-4xl font-black">Login Page</h1>
			<br />
			<Button onClick={onLogin}>Login</Button>
		</div>
	);
}
