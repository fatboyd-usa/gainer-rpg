-- starter schema
drop table if exists xp_log cascade;
drop table if exists calorie_log cascade;
drop table if exists weight_log cascade;
drop table if exists quests cascade;
drop table if exists quest_progress cascade;
drop table if exists badges cascade;
drop table if exists user_badges cascade;
drop table if exists levels cascade;
drop table if exists users cascade;

create table users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique,
  username text unique,
  birthdate date,
  height_cm int,
  starting_weight int,
  current_weight int,
  goal_weight int,
  profile_pic_url text,
  created_at timestamp default now()
);

create table calorie_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  entry_type text check (entry_type in ('breakfast','lunch','dinner','snack','extra_meal')),
  calories int not null,
  logged_at timestamp default now()
);

create table weight_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  weight int not null,
  logged_at timestamp default now()
);

create table xp_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  amount int not null,
  source text not null,
  created_at timestamp default now()
);

create table levels (
  level int primary key,
  xp_required int not null,
  title text not null,
  reward text
);

create table quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  description text,
  xp_reward int not null,
  type text check (type in ('main','side')) not null default 'side',
  status text check (status in ('active','archived','completed')) not null default 'active',
  created_at timestamp default now()
);

create table badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  type text check (type in ('calories','weight','streak','percent_goal')),
  requirement int not null,
  created_at timestamp default now()
);

create table user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  badge_id uuid references badges(id) on delete cascade,
  earned_at timestamp default now()
);

create index idx_calorie_log_user_date on calorie_log(user_id, logged_at);
create index idx_weight_log_user_date on weight_log(user_id, logged_at);
create index idx_xp_log_user_date on xp_log(user_id, created_at);
