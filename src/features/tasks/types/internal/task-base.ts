import type { BaseEntity } from "@/types/core";

// Has the bare minimum fields that are shared across types.
export interface TaskBase extends BaseEntity {
	note: string;
	optional_name: string | null;
	user_id: number;
}
