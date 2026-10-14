import { Scale } from "@/models/scale"

interface ScalesReturnType {
    data: Scale[] | Scale | null
    error: Error | null
}

export async function getScales(): Promise<ScalesReturnType> {
    //todo
    return { data: [], error: null }
}

export async function putScale(payload: Scale): Promise<ScalesReturnType> {
    //todo
    void payload
    return { data: null, error: null }
}

export async function deleteScale(payload: Scale): Promise<ScalesReturnType> {
    //todo
    void payload
    return { data: null, error: null }
}
