ALTER TABLE "TicketedEventPayments"."ThirdPartyPayment"
ALTER COLUMN "PaymentSourceId" DROP NOT NULL;

ALTER TABLE "TicketedEventPayments"."ThirdPartyPayment"
ALTER COLUMN "State" DROP NOT NULL;

ALTER TABLE "TicketedEventPayments"."ThirdPartyPayment"
ALTER COLUMN "TotalAmount" DROP NOT NULL;

ALTER TABLE "TicketedEventPayments"."ThirdPartyPayment"
ALTER COLUMN "Amount" DROP NOT NULL;

ALTER TABLE "TicketedEventPayments"."ThirdPartyPayment"
ALTER COLUMN "ApplicationFeeAmount" DROP NOT NULL;

ALTER TABLE "TicketedEventPayments"."ThirdPartyPayment"
ALTER COLUMN "Refunded" DROP NOT NULL;