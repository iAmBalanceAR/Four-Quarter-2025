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

// Upload image to Supabase Storage
export async function uploadImageToStorage(file: File, path: string = 'events') {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error in uploadImageToStorage:', error);
    throw error;
  }
}

// Admin Event Services
export async function adminCreateEvent(event: any) {
  try {
    const response = await fetch('/api/admin/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating event (admin):', error);
    throw error;
  }
}

export async function adminUpdateEvent(id: string, event: any) {
  try {
    const response = await fetch('/api/admin/events', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...event }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating event (admin):', error);
    throw error;
  }
}

export async function adminDeleteEvent(id: string) {
  try {
    const response = await fetch('/api/admin/events', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete event');
    }

    return true;
  } catch (error) {
    console.error('Error deleting event (admin):', error);
    throw error;
  }
} 