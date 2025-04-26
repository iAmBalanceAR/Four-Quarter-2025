require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const migrationFiles = [
  'fix_db_schema.sql',
  'create_admin.sql',
  'proper_rls.sql',
  'fix_events_policies.sql',
  'RLS-policies.sql',
  'event-rls-policies.sql',
  'fix_events_api.sql',
  'fix_policies.sql'
]

async function runMigrations() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase URL or service role key in environment variables')
    process.exit(1)
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  for (const file of migrationFiles) {
    try {
      console.log(`\nProcessing ${file}...`)
      const sql = fs.readFileSync(file, 'utf8')
      
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0)
      
      for (const statement of statements) {
        console.log(`Executing: ${statement}`)
        const { error } = await supabase.rpc('pgSQL', { query: statement + ';' })
        
        if (error) {
          console.error(`Error executing SQL from ${file}:`, error)
          process.exit(1)
        }
      }
      
      console.log(`✅ Successfully applied ${file}`)
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`Skipping ${file} - file not found`)
        continue
      }
      console.error(`Error processing ${file}:`, error)
      process.exit(1)
    }
  }
  
  console.log('\n🎉 All migrations completed successfully!')
}

runMigrations() 