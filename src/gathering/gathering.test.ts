import { describe, expect, it } from 'vitest'
import { createMemoryNightStore } from './memory-night-store'
import { NightError, createNight } from './night'

function nightWithMemory() {
  return createNight(createMemoryNightStore())
}

const fields = {
  name: 'Saturday beers',
  startTime: new Date('2026-09-19T19:00:00'),
  location: "Justin's porch",
  attire: 'CASUAL',
}

describe('TasteTogether night', () => {
  it('lets a Profile create a Gathering as Host with a Gathering code', async () => {
    const night = nightWithMemory()
    const result = await night.createGathering('profile-host', fields)

    expect(result.role).toBe('Host')
    expect(result.gathering.name).toBe('Saturday beers')
    expect(result.gathering.gatheringCode).toMatch(/^[A-Z]{4}-\d{4}$/)
    expect(result.gathering.id).toBeTruthy()
  })

  it('lets another Profile join that Gathering as Voter by Gathering code', async () => {
    const night = nightWithMemory()
    const created = await night.createGathering('profile-host', fields)

    const joined = await night.joinGathering(
      'profile-voter',
      created.gathering.gatheringCode,
    )

    expect(joined.role).toBe('Voter')
    expect(joined.gathering.id).toBe(created.gathering.id)
    expect(joined.gathering.gatheringCode).toBe(created.gathering.gatheringCode)
  })

  it('rejects joining with an unknown Gathering code', async () => {
    const night = nightWithMemory()

    await expect(night.joinGathering('profile-voter', 'ZZZZ-0000')).rejects.toMatchObject({
      name: 'NightError',
      code: 'not_found',
    } satisfies Partial<NightError>)
  })
})
