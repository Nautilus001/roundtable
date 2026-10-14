import { Category } from "@/models/category";
export class CategoryFactory {
    static fromSupabaseItem(item: any): Category | null {
        console.log(item)

        if (!item || !item.id) {
            console.warn("Error in Category Factory, object doesn't play nice: ", item)
            return null
        }

        return {
            id: item.id,
            created_at: item.created_at,
            name: item.name,
            scale_id: item.scale_id,
            gathering_id: item.gathering_id,
            profile_id: item.profile_id
        }
    }
}