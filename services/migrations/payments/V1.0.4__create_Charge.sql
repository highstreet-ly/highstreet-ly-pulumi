CREATE TABLE "TicketedEventPayments"."Charges" (
    "Id" uuid NOT NULL,
    "PaymentId" uuid NOT NULL,

    "ChargeId" text NULL,
    "PaymentIntent" text NULL,
    
    "Refunded" bool NOT NULL,
    CONSTRAINT "PK_Charges" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Charges_Payments_PaymentId" FOREIGN KEY ("PaymentId") REFERENCES "TicketedEventPayments"."Payments" ("Id") ON DELETE RESTRICT
);
