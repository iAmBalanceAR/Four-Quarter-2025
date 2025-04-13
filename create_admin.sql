-- Add admin user to auth.users and public.profiles
-- First, create the user in auth.users
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO user_id FROM auth.users WHERE email = 'admin@fourquarterbar.com';
  
  -- If not, create the user
  IF user_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@fourquarterbar.com',
      crypt('pass123', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Admin User"}'
    )
    RETURNING id INTO user_id;
  END IF;

  -- Now check if profile exists
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
    -- Update existing profile
    UPDATE public.profiles 
    SET 
      full_name = 'Admin User',
      email = 'admin@fourquarterbar.com',
      is_admin = true,
      updated_at = now()
    WHERE id = user_id;
  ELSE
    -- Create new profile
    INSERT INTO public.profiles (
      id,
      created_at,
      updated_at,
      full_name,
      email,
      is_admin
    ) VALUES (
      user_id,
      now(),
      now(),
      'Admin User',
      'admin@fourquarterbar.com',
      true
    );
  END IF;
END $$; 