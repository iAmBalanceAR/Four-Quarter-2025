-- Drop and recreate policy for events
DROP POLICY IF EXISTS "Allow admin users to insert events" ON public.events;
CREATE POLICY "Allow admin users to insert events" 
ON public.events 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Drop and recreate policy for updating events
DROP POLICY IF EXISTS "Allow admin users to update events" ON public.events;
CREATE POLICY "Allow admin users to update events" 
ON public.events 
FOR UPDATE 
TO authenticated 
USING (true);

-- Update profiles policies
DROP POLICY IF EXISTS "Allow admin users to view all profiles" ON public.profiles;
CREATE POLICY "Allow admin users to view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Allow admin users to update all profiles" ON public.profiles;
CREATE POLICY "Allow admin users to update all profiles" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (true); 