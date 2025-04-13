require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

async function updateSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing environment variables')
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
    process.exit(1)
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('Adding status column to events table...')
    
    // Check if the column already exists
    const { data: columns, error: columnsError } = await supabase
      .from('events')
      .select('status')
      .limit(1)
      .catch(() => ({ data: null }))
    
    if (columns) {
      console.log('Status column already exists, skipping creation')
    } else {
      console.log('Running SQL to add status column...')
      
      // Add the status column with default value
      const { error: alterError } = await supabase.rpc('exec_sql', {
        sql: "ALTER TABLE public.events ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';"
      })
      
      if (alterError) {
        console.error('Error adding status column:', alterError)
        process.exit(1)
      }
      
      // Update existing published events
      const { error: updateError } = await supabase.rpc('exec_sql', {
        sql: "UPDATE public.events SET status = 'published' WHERE is_featured = true AND (status IS NULL OR status = 'draft');"
      })
      
      if (updateError) {
        console.error('Error updating published events:', updateError)
        process.exit(1)
      }
    }
    
    console.log('Schema update completed successfully!')
  } catch (error) {
    console.error('Error updating schema:', error)
    process.exit(1)
  }
}

updateSchema() 