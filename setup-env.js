/**
 * This script helps set up your environment variables for Supabase.
 * Run it with: node setup-env.js
 */
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n📝 Supabase Environment Setup Helper 📝\n');
console.log('This script will help you set up your Supabase environment variables.\n');
console.log('You can find your Supabase URL and keys in your Supabase project dashboard:');
console.log('1. Go to https://app.supabase.com/');
console.log('2. Select your project');
console.log('3. Go to Project Settings > API');
console.log('4. Copy the values for "Project URL", "anon public" and "service_role" keys\n');

let supabaseUrl = '';
let supabaseAnonKey = '';
let supabaseServiceRoleKey = '';

rl.question('Enter your Supabase Project URL: ', (url) => {
  supabaseUrl = url;
  
  rl.question('Enter your Supabase Anon Key: ', (anonKey) => {
    supabaseAnonKey = anonKey;
    
    rl.question('Enter your Supabase Service Role Key: ', (serviceRoleKey) => {
      supabaseServiceRoleKey = serviceRoleKey;
      
      const envContent = `# Local Supabase setup
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}

# Service Role key (used for protected operations on the server)
SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceRoleKey}

VERCEL_URL=https://fourquarterbar.com
`;

      try {
        fs.writeFileSync('.env.local', envContent);
        console.log('\n✅ Success! Environment variables have been written to .env.local');
        console.log('You can now restart your development server for the changes to take effect.');
      } catch (error) {
        console.error('\n❌ Error writing to .env.local:', error);
      }
      
      rl.close();
    });
  });
}); 