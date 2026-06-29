export type EventRole = 'OWNER' | 'JUDGE' | 'VOTER';

export interface Role {
  id: string;          
  created_at: string;  
  event_id: string;    
  profile_id: string;  
  role: EventRole;     
}