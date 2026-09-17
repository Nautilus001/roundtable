export type GatheringRole = 'Host' | 'Voter'

export type GatheringDraft = {
  name: string
  startTime: Date
  location: string
  attire: string
}

export type GatheringRecord = {
  id: string
  name: string
  startTime: Date
  location: string
  attire: string
  gatheringCode: string
}

export type GatheringStore = {
  insertGathering(
    hostProfileId: string,
    draft: GatheringDraft,
  ): Promise<GatheringRecord>
  findByGatheringCode(gatheringCode: string): Promise<GatheringRecord | null>
  addVoter(gatheringId: string, profileId: string): Promise<void>
}

export class GatheringError extends Error {
  readonly code: 'not_found'

  constructor(code: 'not_found', message: string) {
    super(message)
    this.name = 'GatheringError'
    this.code = code
  }
}

export function createGatheringModule(store: GatheringStore) {
  return {
    async createGathering(profileId: string, draft: GatheringDraft) {
      const gathering = await store.insertGathering(profileId, draft)
      return { gathering, role: 'Host' as const }
    },

    async joinGathering(profileId: string, gatheringCode: string) {
      const gathering = await store.findByGatheringCode(
        gatheringCode.trim().toUpperCase(),
      )
      if (!gathering) {
        throw new GatheringError(
          'not_found',
          'We couldn’t find that Gathering. Double-check your code.',
        )
      }
      await store.addVoter(gathering.id, profileId)
      return { gathering, role: 'Voter' as const }
    },
  }
}

export type GatheringModule = ReturnType<typeof createGatheringModule>
