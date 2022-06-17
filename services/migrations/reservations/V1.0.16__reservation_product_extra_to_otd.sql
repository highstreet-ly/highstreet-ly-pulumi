
alter TABLE "Reservation"."ProductExtra"
ADD COLUMN "OrderTicketDetailsId" uuid  NULL;

alter TABLE "Reservation"."ProductExtra"
ADD CONSTRAINT "FK_ProductExtra_OrderTicketDetails_OrderTicketDetailsId" FOREIGN KEY ("OrderTicketDetailsId") REFERENCES "Reservation"."OrderTicketDetails" ("Id") ON DELETE CASCADE;
