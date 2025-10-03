import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider, useAuth } from "./features/auth/stores/auth.tsx";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";

// Create a new router instance
const TanStackQueryProviderContext = TanStackQueryProvider.getContext();

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	context: {
		...TanStackQueryProviderContext,
		// biome-ignore lint/style/noNonNullAssertion: This is provided in the App component. This is done by Tanstack
		auth: undefined!,
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return (
		<TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
			<RouterProvider router={router} context={{ auth }} />
		</TanStackQueryProvider.Provider>
	);
}

export function App() {
	return (
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	);
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
