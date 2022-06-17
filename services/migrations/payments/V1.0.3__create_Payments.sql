CREATE TABLE "TicketedEventPayments"."Payments" (
    "Id" uuid NOT NULL,

    "EventInstanceId" uuid NOT NULL,
    "OrderId" uuid NOT NULL,

   
    "PaymentIntentId" text NULL,
    "PaymentIntentSecret" text NULL,
    "Token" text NULL,
    "Email" text NULL,

    "OrderVersion" int4  NULL,
    
    CONSTRAINT "PK_Payments" PRIMARY KEY ("Id")
);