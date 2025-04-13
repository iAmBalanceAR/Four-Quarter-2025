'use server'

import { createClient } from './server'
import { Database } from '@/types/database.types'
import { Tables, InsertTables, UpdateTables } from '@/types/database.types'

// ===== Event Services =====
export async function getEvents() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true })
  
  if (error) {
    console.error('Error fetching events:', error)
    throw error
  }
  
  return data
}

export async function getFeaturedEvents() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_date', { ascending: true })
  
  if (error) {
    console.error('Error fetching featured events:', error)
    throw error
  }
  
  return data
}

export async function getEventById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching event with id ${id}:`, error)
    throw error
  }
  
  return data
}

export async function getEventsByDateRange(startDate: Date, endDate: Date) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', startDate.toISOString())
    .lte('start_date', endDate.toISOString())
    .order('start_date', { ascending: true })
  
  if (error) {
    console.error('Error fetching events by date range:', error)
    throw error
  }
  
  return data
}

export async function createEvent(event: InsertTables<'events'>) {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select('*')
      .single()
    
    if (error) {
      console.error('Error creating event:', error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error creating event:', error)
    throw error
  }
}

export async function updateEvent(id: string, event: UpdateTables<'events'>) {
  const supabase = createClient()
  
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
      console.error(`Error updating event with id ${id}:`, error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      const updateError = new Error(`Event was found but update returned no data. This may be an RLS issue.`);
      console.error(updateError);
      throw updateError;
    }
    
    return data[0]; // Return the first item rather than using .single()
  } catch (error) {
    console.error(`Error in updateEvent:`, error);
    throw error;
  }
}

export async function deleteEvent(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error(`Error deleting event with id ${id}:`, error)
    throw error
  }
  
  return true
}

// ===== Artist Services =====
export async function getArtists() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching artists:', error)
    throw error
  }
  
  return data
}

export async function getArtistById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching artist with id ${id}:`, error)
    throw error
  }
  
  return data
}

export async function createArtist(artist: InsertTables<'artists'>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('artists')
    .insert(artist)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating artist:', error)
    throw error
  }
  
  return data
}

export async function updateArtist(id: string, artist: UpdateTables<'artists'>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('artists')
    .update(artist)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error(`Error updating artist with id ${id}:`, error)
    throw error
  }
  
  return data
}

export async function deleteArtist(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('artists')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error(`Error deleting artist with id ${id}:`, error)
    throw error
  }
  
  return true
}

// ===== Profile Services =====
export async function getProfile(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error(`Error fetching profile for user ${userId}:`, error)
    throw error
  }
  
  return data
}

export async function updateProfile(userId: string, profile: UpdateTables<'profiles'>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) {
    console.error(`Error updating profile for user ${userId}:`, error)
    throw error
  }
  
  return data
}

// ===== Admin Services =====
export async function getAllProfiles() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  
  if (error) {
    console.error('Error fetching all profiles:', error)
    throw error
  }
  
  return data
}

export async function setAdminStatus(userId: string, isAdmin: boolean) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single()
  
  if (error) {
    console.error(`Error setting admin status for user ${userId}:`, error)
    throw error
  }
  
  return data
}

// Fallback method for when service role key isn't available
export async function fallbackCreateEvent(event: InsertTables<'events'>) {
  const supabase = createClient()
  
  try {
    // Log attempt
    console.log('Attempting to create event with standard client (fallback)');
    
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select('*')
      .single()
    
    if (error) {
      console.error('Error creating event (fallback):', error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error creating event (fallback):', error)
    throw error
  }
} 