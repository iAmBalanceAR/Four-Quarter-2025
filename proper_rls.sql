-- First, enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop any existing problematic policies
DROP POLICY IF EXISTS "Allow admin users to insert events" ON public.events;
DROP POLICY IF EXISTS "Allow admin users to update events" ON public.events;
DROP POLICY IF EXISTS "Allow admin users to delete events" ON public.events;
DROP POLICY IF EXISTS "Allow public read access for events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON public.events;

-- Create proper policies:

-- 1. Allow any authenticated user to create events
CREATE POLICY "authenticated_users_can_insert" 
ON public.events 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 2. Allow read access to published events for everyone
CREATE POLICY "public_can_view_published_events" 
ON public.events 
FOR SELECT 
TO public 
USING (is_featured = true);

-- 3. Allow authenticated users to view all events (including unpublished)
CREATE POLICY "authenticated_users_can_view_all" 
ON public.events 
FOR SELECT 
TO authenticated 
USING (true);

-- 4. Allow users to update only the events they created
-- (When you implement this, you'll need to ensure events have a user_id column)
-- CREATE POLICY "users_can_update_own_events" 
-- ON public.events 
-- FOR UPDATE 
-- TO authenticated 
-- USING (auth.uid() = user_id);

-- 5. For now, allow any authenticated user to update any event
CREATE POLICY "authenticated_users_can_update" 
ON public.events 
FOR UPDATE 
TO authenticated 
USING (true);

-- 6. For now, allow any authenticated user to delete any event
CREATE POLICY "authenticated_users_can_delete" 
ON public.events 
FOR DELETE 
TO authenticated 
USING (true);

-- FUTURE IMPROVEMENTS:
-- 1. Add a user_id column to events and assign the creator's ID
-- 2. Implement more granular policies based on user roles (admin vs regular users)
-- 3. Add created_by field and use that for ownership-based permissions 