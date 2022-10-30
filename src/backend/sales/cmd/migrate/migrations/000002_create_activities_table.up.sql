create table if not exists activities (
   activity_uuid uuid primary key default uuid_generate_v4(),
   title varchar(250) not null
);