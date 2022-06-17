CREATE TABLE "Reservation"."OrderTicketDetails" (
    "Id" uuid NOT NULL,
    "DraftOrderItemId" uuid NOT NULL, 
    "EventInstanceId" uuid NOT NULL,
      
    "Name" text NULL,
    "DisplayName" text NULL,
   
    "Price" NUMERIC(10,2) NULL,
    "Quantity" int4 NULL,
   
    CONSTRAINT "PK_OrderTicketDetails" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_OrderTicketDetails_DraftOrderItem_DraftOrderItemId" FOREIGN KEY ("DraftOrderItemId") REFERENCES "Reservation"."DraftOrderItem" ("Id") ON DELETE CASCADE
);


