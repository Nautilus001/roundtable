import { Category } from "@/models/category";
export class CategoryFactory {
    static fromSupabaseItem(item: any): Category | null {
        const category = item.events

        if (!category || !category.id) {
            console.warn("Error in Category Factory, object doesn't play nice: ", category)
            return null
        }
        return {
            id: category.id,
            created_at: category.created_at,
            name: category.name,
            scale_id: category.scale_id,
            gathering_id: category.gathering_id,
            profile_id: category.profile_id
        }
    }
}