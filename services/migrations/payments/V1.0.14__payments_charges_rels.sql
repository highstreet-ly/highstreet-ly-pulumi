

ALTER TABLE "TicketedEventPayments"."Charges"
	ADD CONSTRAINT "FK_Charges_Paymemts_PaymentId" 
	FOREIGN KEY ("PaymentId") REFERENCES "TicketedEventPayments"."Payments" ("Id") ON DELETE CASCADE;

