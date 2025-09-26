import type { CategoryModel } from "@/features/categories/types/category-model";
import type { ActivityModel } from "./activity-model";

export type ActivityWithCategory = Omit<ActivityModel, "category_id"> & {
	category: CategoryModel;
};
