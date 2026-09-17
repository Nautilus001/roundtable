import {
  GatheringDraft,
  GatheringRecord,
  NightRole,
  NightStore,
} from './night'

const CODE_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

function randomCode(taken: Set<string>): string {
  for (let attempt = 0; attempt < 50; attempt++) {
    let letters = ''
    for (let i = 0; i < 4; i++) {
      letters += CODE_LETTERS[Math.floor(Math.random() * CODE_LETTERS.length)]
    }
    const digits = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
    const code = `${letters}-${digits}`
    if (!taken.has(code)) return code
  }
  throw new Error('Could not mint a unique Gathering code')
}

export function createMemoryNightStore(): NightStore {
  const gatherings = new Map<string, GatheringRecord>()
  const members = new Map<string, Map<string, NightRole>>()
  const codes = new Set<string>()
  let nextId = 1

  return {
    async insertGathering(hostProfileId, draft: GatheringDraft) {
      const gatheringCode = randomCode(codes)
      codes.add(gatheringCode)
      const gathering: GatheringRecord = {
        id: String(nextId++),
        name: draft.name,
        startTime: draft.startTime,
        location: draft.location,
        attire: draft.attire,
        gatheringCode,
      }
      gatherings.set(gathering.id, gathering)
      members.set(gathering.id, new Map([[hostProfileId, 'Host']]))
      return gathering
    },

    async findByGatheringCode(gatheringCode) {
      const normalized = gatheringCode.trim().toUpperCase()
      for (const gathering of gatherings.values()) {
        if (gathering.gatheringCode === normalized) return gathering
      }
      return null
    },

    async addVoter(gatheringId, profileId) {
      const roster = members.get(gatheringId)
      if (!roster) return
      if (!roster.has(profileId)) roster.set(profileId, 'Voter')
    },
  }
}
