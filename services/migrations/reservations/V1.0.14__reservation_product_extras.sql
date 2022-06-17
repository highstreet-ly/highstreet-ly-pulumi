CREATE TABLE "Reservation"."ProductExtra" (
    "Id" uuid NOT NULL,
    "PricedOrderLineId" uuid  NULL,
      
    "Name" text NULL,
    "Description" text NULL,
   
    "Price" NUMERIC(10,2) NULL,
    "ItemCount" int4 NULL,

    "Selected" bool NULL,
   
    CONSTRAINT "PK_ProductExtra" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ProductExtra_PricedOrderLine_PricedOrderLineId" FOREIGN KEY ("PricedOrderLineId") REFERENCES "Reservation"."PricedOrderLine" ("Id") ON DELETE CASCADE
);