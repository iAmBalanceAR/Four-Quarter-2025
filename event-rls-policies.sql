-- Enable RLS on the events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access for published events
CREATE POLICY "Public can view published events" 
ON events 
FOR SELECT 
TO public
USING (is_featured = TRUE);

-- Allow authenticated users with admin role to perform all operations
CREATE POLICY "Admins can do everything" 
ON events 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = TRUE
  )
);

-- Allow service role to bypass RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE events FORCE ROW LEVEL SECURITY;

-- Grant access to service role
GRANT ALL ON events TO service_role; 