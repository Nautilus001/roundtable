export function normalizeArray<T>(data: T | T[] | null | undefined): T[] {
    if (!data) return []
    return Array.isArray(data) ? data : [data]
}