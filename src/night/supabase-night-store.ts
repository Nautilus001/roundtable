import type { SupabaseClient } from '@supabase/supabase-js'
import { Gathering } from '@/models/gathering'
import { joinEventByCode, postGathering } from '@/services/gathering'
import { GatheringRecord, NightError, NightStore } from './night'

function mapEventRow(row: {
  id: string
  name: string
  start_time: string | Date
  location: unknown
  attire: string
  event_code: string
}): GatheringRecord {
  return {
    id: String(row.id),
    name: row.name,
    startTime: new Date(row.start_time),
    location: typeof row.location === 'string' ? row.location : '',
    attire: row.attire,
    gatheringCode: row.event_code,
  }
}

function asRow(data: unknown) {
  if (Array.isArray(data)) return data[0]
  return data
}

export function createSupabaseNightStore(client: SupabaseClient): NightStore {
  return {
    async insertGathering(_hostProfileId, draft) {
      const { data, error } = await postGathering({
        name: draft.name,
        start_time: draft.startTime,
        location: draft.location,
        attire: draft.attire as Gathering['attire'],
      })
      if (error || data == null) {
        throw new Error(error?.message ?? 'Could not create Gathering')
      }
      const row = asRow(data) as { id?: string } | null
      if (row && 'event_code' in row && 'name' in row) {
        return mapEventRow(row as Parameters<typeof mapEventRow>[0])
      }
      if (!row?.id) {
        throw new Error('Could not create Gathering')
      }
      const { data: fetched, error: fetchError } = await client
        .from('events')
        .select('id, name, start_time, location, attire, event_code')
        .eq('id', row.id)
        .single()
      if (fetchError || !fetched) {
        throw new Error(fetchError?.message ?? 'Could not load Gathering')
      }
      return mapEventRow(fetched)
    },

    async findByGatheringCode(gatheringCode) {
      const { data, error } = await client
        .from('events')
        .select('id, name, start_time, location, attire, event_code')
        .eq('event_code', gatheringCode)
        .maybeSingle()
      if (error) {
        throw new Error(error.message)
      }
      if (!data) return null
      return mapEventRow(data)
    },

    async addVoter(gatheringId, _profileId) {
      const { data: row, error: lookupError } = await client
        .from('events')
        .select('event_code')
        .eq('id', gatheringId)
        .single()
      if (lookupError || !row?.event_code) {
        throw new NightError(
          'not_found',
          'We couldn’t find that Gathering. Double-check your code.',
        )
      }
      const { data, error } = await joinEventByCode(row.event_code)
      if (error) {
        throw new Error(error.message)
      }
      if (!data?.success) {
        throw new NightError(
          'not_found',
          data?.message || 'We couldn’t find that Gathering. Double-check your code.',
        )
      }
    },
  }
}
