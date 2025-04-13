// This is a server-only file for admin operations
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

// Create a Supabase client with the service role key for admin operations
export function createAdminClient() {
  // Debug logging to help identify the issue
  console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("supabaseKey is required. Please ensure SUPABASE_SERVICE_ROLE_KEY is set in your environment variables.");
  }
  
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Admin Event Services
export async function adminCreateEvent(event: any) {
  const supabase = createAdminClient()
  
  try {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select('*')
      .single()
    
    if (error) {
      console.error('Error creating event (admin):', error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error creating event (admin):', error)
    throw error
  }
}

export async function adminUpdateEvent(id: string, event: any) {
  const supabase = createAdminClient()
  
  try {
    // First, check if the event exists
    const { data: existingEvent, error: checkError } = await supabase
      .from('events')
      .select('id')
      .eq('id', id);
      
    if (checkError) {
      console.error(`Error checking for event with id ${id}:`, checkError);
      throw checkError;
    }
    
    if (!existingEvent || existingEvent.length === 0) {
      const notFoundError = new Error(`Event with id ${id} not found`);
      console.error(notFoundError);
      throw notFoundError;
    }
    
    // If the event exists, proceed with the update
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select('*');
    
    if (error) {
      console.error(`Error updating event with id ${id} (admin):`, error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      const updateError = new Error(`Event was found but update returned no data. This may be an RLS issue.`);
      console.error(updateError);
      throw updateError;
    }
    
    return data[0]; // Return the first item rather than using .single()
  } catch (error) {
    console.error(`Error in adminUpdateEvent:`, error);
    throw error;
  }
}

export async function adminDeleteEvent(id: string) {
  const supabase = createAdminClient()
  
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error(`Error deleting event with id ${id} (admin):`, error)
    throw error
  }
  
  return true
} 