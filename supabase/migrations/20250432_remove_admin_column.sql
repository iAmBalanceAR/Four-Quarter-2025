-- Drop the sync_admin_role trigger and function since we don't need them anymore
DROP TRIGGER IF EXISTS sync_admin_role ON public.profiles;
DROP FUNCTION IF EXISTS public.sync_admin_role();

-- Remove is_admin column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;

-- Update existing users to have authenticated role
UPDATE auth.users
SET raw_user_meta_data = 
  COALESCE(raw_user_meta_data, '{}'::jsonb) || 
  jsonb_build_object('role', 'authenticated'); 