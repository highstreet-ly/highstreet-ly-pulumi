ALTER TABLE "TicketingEventRegistrationProcesses"."RegistrationProcess" ADD COLUMN "IsStockManaged" BOOLEAN;
UPDATE "TicketingEventRegistrationProcesses"."RegistrationProcess" SET "IsStockManaged" = 't';
ALTER TABLE "TicketingEventRegistrationProcesses"."RegistrationProcess" ALTER COLUMN "IsStockManaged" SET NOT NULL;
ALTER TABLE "TicketingEventRegistrationProcesses"."RegistrationProcess" ALTER COLUMN "IsStockManaged" SET DEFAULT TRUE;