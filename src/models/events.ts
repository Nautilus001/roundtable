export type EventRole = 'OWNER' | 'JUDGE' | 'VOTER';
export type Attire = 'BLACK TIE' | 'CASUAL';

export interface Role {
  id: string;          
  created_at: string;  
  event_id: string;    
  profile_id: string;  
  role: EventRole;     
}

export interface Event {
    id?: string
    name: string
    start_time: Date
    location: any
    attire: Attire
    event_code?: string
    role?: EventRole
}