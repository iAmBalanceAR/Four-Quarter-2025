-- Enable the pg_graphql extension
CREATE EXTENSION IF NOT EXISTS pg_graphql;

-- Set up GraphQL schema
COMMENT ON SCHEMA public IS '@graphql({"name": "public"})'; 