CREATE SCHEMA IF NOT EXISTS "TicketedEventPayments";

CREATE TABLE "TicketedEventPayments"."StripeCustomers" (
    "Id" text NOT NULL,
    "AccountBalance" int4 NOT NULL,
    "Created" int4 NOT NULL,
    "Currency" text NULL,
    "DefaultSource" text NULL,
    "Delinquent" bool NOT NULL,
    "Description" text NULL,
    "Discount" text NULL,
    "Email" text NULL,
    "Livemode" bool NOT NULL,
    "Shipping" text NULL,
    "SonatribeUserId" uuid NOT NULL,
    CONSTRAINT "PK_StripeCustomers" PRIMARY KEY ("Id")
);

CREATE TABLE "TicketedEventPayments"."ThirdPartyProcessorPayments" (
    "Id" uuid NOT NULL,
    "Description" text NULL,
    "PaymentSourceId" uuid NOT NULL,
    "StateValue" int4 NOT NULL,
    "TotalAmount" numeric NOT NULL,
    "Email" text NULL,
    CONSTRAINT "PK_ThirdPartyProcessorPayments" PRIMARY KEY ("Id")
);

CREATE TABLE "TicketedEventPayments"."ThidPartyProcessorPaymentItems" (
    "Id" uuid NOT NULL,
    "Amount" numeric NOT NULL,
    "Description" text NULL,
    "ThirdPartyProcessorPaymentId" uuid NULL,
    CONSTRAINT "PK_ThidPartyProcessorPaymentItems" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ThidPartyProcessorPaymentItems_ThirdPartyProcessorPayments_ThirdPartyProcessorPaymentId" FOREIGN KEY ("ThirdPartyProcessorPaymentId") REFERENCES "TicketedEventPayments"."ThirdPartyProcessorPayments" ("Id") ON DELETE RESTRICT
);

CREATE INDEX "IX_ThidPartyProcessorPaymentItems_ThirdPartyProcessorPaymentId" ON "TicketedEventPayments"."ThidPartyProcessorPaymentItems" ("ThirdPartyProcessorPaymentId");
