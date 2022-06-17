ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "DateCreated" TIMESTAMP NULL;
UPDATE "TicketedEventPayments"."Charges"  SET "DateCreated" = now();
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "DateCreated" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "DateCreated" SET DEFAULT now();

ALTER TABLE "TicketedEventPayments"."Payments" ADD COLUMN "DateCreated" TIMESTAMP NULL;
UPDATE "TicketedEventPayments"."Payments"  SET "DateCreated" = now();
ALTER TABLE "TicketedEventPayments"."Payments" ALTER COLUMN "DateCreated" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Payments" ALTER COLUMN "DateCreated" SET DEFAULT now();

ALTER TABLE "TicketedEventPayments"."Refunds" ADD COLUMN "DateCreated" TIMESTAMP NULL;
UPDATE "TicketedEventPayments"."Refunds"  SET "DateCreated" = now();
ALTER TABLE "TicketedEventPayments"."Refunds" ALTER COLUMN "DateCreated" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Refunds" ALTER COLUMN "DateCreated" SET DEFAULT now();
