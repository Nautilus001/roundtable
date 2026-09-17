import { Attire, EventRole, Gathering } from '@/models/gathering'
import { GatheringRecord, NightRole } from './night'

export function toUiGathering(
  gathering: GatheringRecord,
  role: NightRole,
): Gathering {
  const uiRole: EventRole = role === 'Host' ? 'OWNER' : 'VOTER'
  return {
    id: gathering.id,
    name: gathering.name,
    start_time: gathering.startTime,
    location: gathering.location,
    attire: gathering.attire as Attire,
    event_code: gathering.gatheringCode,
    role: uiRole,
  }
}
