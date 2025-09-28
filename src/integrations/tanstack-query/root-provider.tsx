import {
	type DefaultOptions,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { millisecondsInMinute } from "date-fns/constants";

const options: DefaultOptions = {
	queries: {
		staleTime: millisecondsInMinute,
	},
};

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: options,
	});
	return {
		queryClient,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
