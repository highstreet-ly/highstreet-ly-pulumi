ALTER TABLE "Management"."OrderTicket" 
ADD COLUMN "Attendee" jsonb null default '{}'::jsonb;
