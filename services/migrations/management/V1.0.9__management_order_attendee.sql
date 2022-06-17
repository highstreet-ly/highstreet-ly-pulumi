ALTER TABLE "Management"."Order" 
ADD COLUMN "Attendee" jsonb null default '{}'::jsonb;
