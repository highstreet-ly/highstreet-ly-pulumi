ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "Amount" numeric NULL;
UPDATE "TicketedEventPayments"."Charges" SET "Amount" = 0 ;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "Amount" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "Amount" SET DEFAULT 0;


ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "AmountCaptured" numeric NULL;
UPDATE "TicketedEventPayments"."Charges" SET "AmountCaptured" = 0 ;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "AmountCaptured" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "AmountCaptured" SET DEFAULT 0;

ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "AmounRefunded" numeric NULL;
UPDATE "TicketedEventPayments"."Charges" SET "AmounRefunded" = 0 ;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "AmounRefunded" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "AmounRefunded" SET DEFAULT 0;

ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "Application" TEXT NULL;

ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "ApplicationFee" numeric NULL;
UPDATE "TicketedEventPayments"."Charges" SET "ApplicationFee" = 0 ;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "ApplicationFee" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "ApplicationFee" SET DEFAULT 0;


ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "ApplicationFeeAmount" numeric NULL;
UPDATE "TicketedEventPayments"."Charges" SET "ApplicationFeeAmount" = 0 ;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "ApplicationFeeAmount" SET NOT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ALTER COLUMN "ApplicationFeeAmount" SET DEFAULT 0;

ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "Currency" TEXT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "Description" TEXT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "FailureCode" TEXT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "FailureMessage" TEXT NULL;
ALTER TABLE "TicketedEventPayments"."Charges" ADD COLUMN "RecieptUrl" TEXT NULL;