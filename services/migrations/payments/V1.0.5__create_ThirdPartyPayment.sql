CREATE TABLE "TicketedEventPayments"."ThirdPartyPayment" (
    "Id" uuid NOT NULL,
    "PaymentSourceId" uuid NOT NULL,
    "Description" text NULL,
    "Last4" text NULL,
    "OutcomeDescription" text NULL,
    "OutcomeCode" text NULL,
    "Currency" text NULL,
    "State" numeric NOT NULL,
    "TotalAmount" numeric NOT NULL,
    "Amount" numeric NOT NULL,
    "ApplicationFeeAmount" numeric NOT NULL,
    "Created" timestamp default NULL,
    "Refunded" bool NOT NULL,
    CONSTRAINT "PK_ThirdPartyPayment" PRIMARY KEY ("Id")
);