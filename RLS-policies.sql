-- Enable RLS on the events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access for published events
CREATE POLICY "Public can view published events" 
ON events 
FOR SELECT 
TO public
USING (is_featured = TRUE);

-- Allow authenticated users to perform all operations
CREATE POLICY "Authenticated users can do everything" 
ON events 
FOR ALL 
TO authenticated;

-- Grant access to service role (bypasses RLS)
GRANT ALL ON events TO service_role; 