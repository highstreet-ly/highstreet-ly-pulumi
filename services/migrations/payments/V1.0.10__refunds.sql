CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "TicketedEventPayments"."Refunds" (
    "Id" uuid NOT NULL default uuid_generate_v4(),
    "ChargeId" uuid NOT NULL,
    "Reason" text NULL,
    "RefundNote" text NULL,
    "Currency" text NULL,
    "PaymentIntent" text NULL,
    "ReceiptNumber" text NULL,
    "SourceTransferReversal" boolean NULL,
    "TransferReversal" boolean NULL,
    "Status" text NULL,

    "Amount" numeric NOT NULL,

    "Created" timestamp default NULL,

    CONSTRAINT "PK_Refunds" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Refunds_Charges_ChargeId" FOREIGN KEY ("ChargeId") REFERENCES "TicketedEventPayments"."Charges" ("Id") ON DELETE CASCADE
);