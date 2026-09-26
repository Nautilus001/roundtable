import { ItemContext } from "@/contexts/items-context"
import { useContext } from "react"

export const useItemContext = () => useContext(ItemContext)