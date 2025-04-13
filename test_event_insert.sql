-- Insert a test event
INSERT INTO public.events (
  title, 
  description, 
  start_date, 
  end_date, 
  location, 
  is_featured, 
  price, 
  notes
) VALUES (
  'Test Event', 
  'This is a test event to verify database insertion is working.', 
  NOW() + interval '2 days', 
  NOW() + interval '2 days' + interval '3 hours', 
  'Four Quarter Bar', 
  true, 
  25.00, 
  'Test notes for the event'
); 