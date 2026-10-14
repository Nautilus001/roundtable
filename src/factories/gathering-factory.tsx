import { Gathering } from "@/models/gathering";
export class GatheringFactory {
    static fromSupabaseItem(item: any): Gathering | null{
        const gathering = item.gatherings ? 
            (Array.isArray(item.gatherings) ? 
                item.gatherings[0] 
                : item.gatherings) 
            : item;
            
        if (!gathering || !gathering.id) {
            console.warn("Error in Gathering Factory, object doesn't play nice: ", gathering)
            return null
        }

        return {
            id: gathering.id,
            created_at: gathering.created_at,
            name: gathering.name,
            start_time: gathering.start_time,
            location: gathering.location,
            attire: gathering.attire,
            event_code: gathering.event_code ?? "",
            role: item.role,
            inProgress: gathering.active ?? false,
            items: gathering.items ?? []
        }
    }
}