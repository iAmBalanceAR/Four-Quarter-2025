-- Simplest solution: disable RLS for the events table
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Or if you need RLS but want to allow all operations for authenticated users:
-- DROP POLICY IF EXISTS "Allow admin users to insert events" ON public.events;
-- CREATE POLICY "Allow authenticated users to do everything" 
-- ON public.events 
-- FOR ALL 
-- TO authenticated
-- USING (true); 