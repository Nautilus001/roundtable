export type EventRole = 'OWNER' | 'JUDGE' | 'VOTER'; // Add any other custom roles here

export interface ProfileRole {
  id: string;          
  created_at: string;  
  event_id: string;    
  profile_id: string;  
  role: EventRole;     
}