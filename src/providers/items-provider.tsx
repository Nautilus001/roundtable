import {ItemContext} from "@/contexts/items-context"
import {Item} from "@/models/item"
import {deleteItem, getItems, postItem, putItem} from "@/services/items"
import {normalizeArray} from "@/services/util"
import {useState} from "react"

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
    // const {isLoading, setIsLoading} = useLoadingContext();
    const [loading, setIsLoading] = useState<boolean>(false)
    const [items, setItems] = useState<Item[] | null>(null)

    async function fetchItems(gatheringID: string) {
        setIsLoading(true)
        try { 
            const { data, error } = (await getItems(gatheringID))
            if (error || !data) throw Error()
            if (Array.isArray(data)) setItems(data)
        } catch (error: any) {
            console.error("Unexpected error in fetchGatherings in items-provider:", error)
        } finally {
            setIsLoading(false)
        }
    }    

    const createItem = async (payload: Item) => {
        setIsLoading(true)
        try {
            const {data, error} = await postItem(payload)
            if (error || !data) throw Error()
            setItems(normalizeArray(data));
        } catch (error: any) {
            console.error("Error on createItem from items-provider: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateItem = async (payload: Item) => {
        setIsLoading(true)
        try {
            const {data, error} = await putItem(payload)
            if (error || !data) throw Error()
            const updatedItem = normalizeArray(data)
            //TODO: Add updated Item back into the items context
        } catch (error: any) {
            console.error("Error on updateItem in items-provider: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const removeItem = async (payload: Item) => {
        setIsLoading(true)
        try {
            const {error} = await deleteItem(payload)
            if (error) throw Error()
        } catch (error: any) {
            console.error("Error on removeItem in items-provider: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
            <ItemContext.Provider value={{
                items,
                createItem,
                updateItem,
                removeItem,
                fetchItems
            }}>
                {children}
            </ItemContext.Provider>
        )
}