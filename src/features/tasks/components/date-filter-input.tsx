import { Link, useNavigate } from "@tanstack/react-router";
import { addDays, format, isSameDay, parse } from "date-fns";

const shiftDate = (date: string, delta: number) => {
	const current = parse(date, "yyyy-MM-dd", new Date());
	const newDateObj = addDays(current, delta);
	return format(newDateObj, "yyyy-MM-dd");
};

interface Props {
	date: string;
}

export const DateFilterInput = ({ date }: Props) => {
	const navigate = useNavigate();

	const current = parse(date, "yyyy-MM-dd", new Date());
	const isToday = isSameDay(current, new Date());

	const onInputChange = (value: string) => {
		// Update only the date search param and preserve others
		navigate({
			to: ".",
			search: (prev) => ({ ...prev, date: value }),
		});
	};

	return (
		<div className="flex items-center space-x-2">
			<Link
				to="."
				search={(prev) => ({ ...prev, date: shiftDate(date, -1) })}
				preload="intent"
				preloadDelay={0}
				aria-label="Previous day"
				title="Previous day">
				Previous
			</Link>
			<input
				type="date"
				value={date}
				max={format(new Date(), "yyyy-MM-dd")}
				onChange={(e) => onInputChange(e.target.value)}
				aria-label="Select date"
				className="border rounded px-2 py-1"
			/>
			{isToday ? (
				<span
					aria-disabled
					className="opacity-50 cursor-not-allowed"
					title="Already at today">
					Next
				</span>
			) : (
				<Link
					to="."
					search={(prev) => ({ ...prev, date: shiftDate(date, 1) })}
					preload="intent"
					preloadDelay={0}
					aria-label="Next day"
					title="Next day">
					Next
				</Link>
			)}
		</div>
	);
};
