// run-migration.js
require('dotenv').config()
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

async function runMigration() {
  // Read SQL file
  const sql = fs.readFileSync('./fix_db_schema.sql', 'utf8')
  
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase URL or service role key in environment variables')
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
    process.exit(1)
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('Running SQL migration...')
    
    // Split the SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)
    
    for (const statement of statements) {
      console.log(`Executing: ${statement}`)
      const { error } = await supabase.rpc('pgSQL', { query: statement + ';' })
      
      if (error) {
        console.error('Error executing SQL:', error)
        process.exit(1)
      }
    }
    
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Error running migration:', error)
    process.exit(1)
  }
}

runMigration() 