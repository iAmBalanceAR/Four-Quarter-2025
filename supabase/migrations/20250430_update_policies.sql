-- Drop existing policies
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete" ON public.profiles;
DROP POLICY IF EXISTS "events_select" ON public.events;
DROP POLICY IF EXISTS "events_insert" ON public.events;
DROP POLICY IF EXISTS "events_update" ON public.events;
DROP POLICY IF EXISTS "events_delete" ON public.events;
DROP POLICY IF EXISTS "artists_select" ON public.artists;
DROP POLICY IF EXISTS "artists_insert" ON public.artists;
DROP POLICY IF EXISTS "artists_update" ON public.artists;
DROP POLICY IF EXISTS "artists_delete" ON public.artists;

-- Create simplified policies for authenticated users
CREATE POLICY "profiles_select" ON public.profiles
    FOR SELECT USING (
        auth.role() = 'authenticated'
    );

CREATE POLICY "profiles_update" ON public.profiles
    FOR UPDATE USING (
        auth.uid() = id AND auth.role() = 'authenticated'
    );

CREATE POLICY "profiles_insert" ON public.profiles
    FOR INSERT WITH CHECK (
        auth.uid() = id AND auth.role() = 'authenticated'
    );

CREATE POLICY "profiles_delete" ON public.profiles
    FOR DELETE USING (
        auth.role() = 'authenticated'
    );

-- Create basic policies for events
CREATE POLICY "events_select" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "events_insert" ON public.events
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated'
    );

CREATE POLICY "events_update" ON public.events
    FOR UPDATE USING (
        auth.role() = 'authenticated'
    );

CREATE POLICY "events_delete" ON public.events
    FOR DELETE USING (
        auth.role() = 'authenticated'
    );

-- Create basic policies for artists
CREATE POLICY "artists_select" ON public.artists
    FOR SELECT USING (true);

CREATE POLICY "artists_insert" ON public.artists
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated'
    );

CREATE POLICY "artists_update" ON public.artists
    FOR UPDATE USING (
        auth.role() = 'authenticated'
    );

CREATE POLICY "artists_delete" ON public.artists
    FOR DELETE USING (
        auth.role() = 'authenticated'
    ); 