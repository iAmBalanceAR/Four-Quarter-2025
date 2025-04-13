-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin users to delete events" ON public.events;
DROP POLICY IF EXISTS "Allow admin users to insert events" ON public.events;
DROP POLICY IF EXISTS "Allow admin users to update events" ON public.events;
DROP POLICY IF EXISTS "Allow public read access for events" ON public.events;
DROP POLICY IF EXISTS "Public can view published events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON public.events;

-- Enable RLS on the events table (if not already enabled)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create simplified policies for authenticated users
CREATE POLICY "Authenticated users can do everything" 
ON public.events 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public to view all events
CREATE POLICY "Public can view all events" 
ON public.events 
FOR SELECT 
TO public
USING (true);

-- Grant access to the service role (bypasses RLS)
GRANT ALL ON public.events TO service_role; 