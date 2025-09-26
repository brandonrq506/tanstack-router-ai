import type { BaseEntity } from "@/types/core";
import type { TaskModel } from "./task-model";

export type TaskPostPayload = Omit<TaskModel, keyof BaseEntity>;
