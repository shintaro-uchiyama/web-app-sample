CREATE TABLE IF NOT EXISTS public.activities (
   activity_uuid DEFAULT uuid_generate_v4(),
   name VARCHAR (250) NOT NULL
);