import { describe, expect, it } from 'vitest'
import { createMemoryGatheringStore } from './memory-gathering-store'
import { GatheringError, createGatheringModule } from './gathering'

function gatheringModuleWithMemory() {
  return createGatheringModule(createMemoryGatheringStore())
}

const fields = {
  name: 'Saturday beers',
  startTime: new Date('2026-09-19T19:00:00'),
  location: "Justin's porch",
  attire: 'CASUAL',
}

describe('Gathering', () => {
  it('lets a Profile create a Gathering as Host with a Gathering code', async () => {
    const gatherings = gatheringModuleWithMemory()
    const result = await gatherings.createGathering('profile-host', fields)

    expect(result.role).toBe('Host')
    expect(result.gathering.name).toBe('Saturday beers')
    expect(result.gathering.gatheringCode).toMatch(/^[A-Z]{4}-\d{4}$/)
    expect(result.gathering.id).toBeTruthy()
  })

  it('lets another Profile join that Gathering as Voter by Gathering code', async () => {
    const gatherings = gatheringModuleWithMemory()
    const created = await gatherings.createGathering('profile-host', fields)

    const joined = await gatherings.joinGathering(
      'profile-voter',
      created.gathering.gatheringCode,
    )

    expect(joined.role).toBe('Voter')
    expect(joined.gathering.id).toBe(created.gathering.id)
    expect(joined.gathering.gatheringCode).toBe(created.gathering.gatheringCode)
  })

  it('rejects joining with an unknown Gathering code', async () => {
    const gatherings = gatheringModuleWithMemory()

    await expect(gatherings.joinGathering('profile-voter', 'ZZZZ-0000')).rejects.toMatchObject({
      name: 'GatheringError',
      code: 'not_found',
    } satisfies Partial<GatheringError>)
  })
})
