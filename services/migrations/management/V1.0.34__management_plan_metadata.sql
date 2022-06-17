alter TABLE "Management"."Plan"
ADD COLUMN "Metadata" jsonb not null default '{}'::jsonb;