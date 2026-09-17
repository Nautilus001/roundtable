export type NightRole = 'Host' | 'Voter'

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

export type NightStore = {
  insertGathering(
    hostProfileId: string,
    draft: GatheringDraft,
  ): Promise<GatheringRecord>
  findByGatheringCode(gatheringCode: string): Promise<GatheringRecord | null>
  addVoter(gatheringId: string, profileId: string): Promise<void>
}

export class NightError extends Error {
  readonly code: 'not_found'

  constructor(code: 'not_found', message: string) {
    super(message)
    this.name = 'NightError'
    this.code = code
  }
}

export function createNight(store: NightStore) {
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
        throw new NightError(
          'not_found',
          'We couldn’t find that Gathering. Double-check your code.',
        )
      }
      await store.addVoter(gathering.id, profileId)
      return { gathering, role: 'Voter' as const }
    },
  }
}

export type Night = ReturnType<typeof createNight>
