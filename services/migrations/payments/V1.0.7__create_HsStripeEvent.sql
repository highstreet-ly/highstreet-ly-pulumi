CREATE TABLE "TicketedEventPayments"."HsStripeEvent" (
    "Id" uuid NOT NULL,
    "Data" jsonb not null default '{}'::jsonb,
    CONSTRAINT "PK_HsStripeEvent" PRIMARY KEY ("Id")
);