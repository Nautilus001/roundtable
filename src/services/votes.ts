export interface Vote {
    id?: string
    gathering_id: string
    profile_id: string
    item_id: string
    value: string
}

interface VotesReturnType {
    data: Vote[] | Vote | null
    error: Error | null
}

export async function getVotes(gathering_id: string): Promise<VotesReturnType> {
    //todo
    void gathering_id
    return { data: [], error: null }
}

export async function putVote(payload: Vote): Promise<VotesReturnType> {
    //todo
    void payload
    return { data: null, error: null }
}

export async function deleteVote(payload: Vote): Promise<VotesReturnType> {
    //todo
    void payload
    return { data: null, error: null }
}
