-- Check if pg_graphql extension exists
SELECT EXISTS (
    SELECT 1 
    FROM pg_extension 
    WHERE extname = 'pg_graphql'
) as has_graphql;

-- If it doesn't exist, try to install it
CREATE EXTENSION IF NOT EXISTS pg_graphql;

-- Set up GraphQL schema
COMMENT ON SCHEMA public IS '@graphql({"name": "public"})'; 