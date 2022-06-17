CREATE SCHEMA IF NOT EXISTS "Reservation";

CREATE TABLE "Reservation"."DraftOrder" (
    "Id" uuid NOT NULL,
    "OrderId" uuid NOT NULL,
    "EventInstanceId" uuid NOT NULL,

    "ReservationExpirationDate" timestamp default NULL,
  
    "OwnerId" text NULL,
    "OwnerEmail" text NULL,
    "OwnerPhone" text NULL,
    "OwnerName" text NULL,
    "DeliveryLine1" text NULL,
    "DeliveryPostcode" text NULL,
    "HumanReadableId" text NULL,

    "State" int4 NOT NULL,
    "OrderVersion" int4 NOT NULL,

    "IsClickAndCollect" bool NOT NULL,
    "IsLocalDelivery" bool NOT NULL,
    "IsNationalDelivery" bool NOT NULL,
   
    CONSTRAINT "PK_DraftOrder" PRIMARY KEY ("Id")
);

CREATE TABLE "Reservation"."DraftOrderItem" (
    "Id" uuid NOT NULL,
    "DraftOrderId" uuid NOT NULL,
    "TicketType" uuid NOT NULL,
   
    "RequestedTickets" int4 NOT NULL,
    "ReservedTickets" int4 NOT NULL,

    "OrderTicketDetails" jsonb not null default '{}'::jsonb,
   
    CONSTRAINT "PK_DraftOrderItem" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_DraftOrderItem_DraftOrder_DraftOrderId" FOREIGN KEY ("DraftOrderId") REFERENCES "Reservation"."DraftOrder" ("Id") ON DELETE CASCADE
);


CREATE TABLE "Reservation"."MyOrders" (
    "Id" uuid NOT NULL,
    "EventInstanceId" uuid NOT NULL,
   
    "AssignedTickets" int4 NOT NULL,
    "UnassignedTickets" int4 NOT NULL,
    "State" int4 NOT NULL,
    
    "EventInstanceName" text NULL,
    "EventInstanceShortLocation" text NULL,
    "OwnerEmail" text NULL,
    "EventInstanceSlug" text NULL,
    "MainImageId" text NULL,
    "OwnerId" text NULL,
     
    "DatePlaced" timestamp default NULL,
   
    CONSTRAINT "PK_MyOrders" PRIMARY KEY ("Id")
);


CREATE TABLE "Reservation"."PricedOrder" (
    "Id" uuid NOT NULL,
    "OrderId" uuid NOT NULL,

    "ReservationExpirationDate" timestamp default NULL,
  
    "OwnerId" text NULL,
    "HumanReadableId" text NULL,
    
    "Total" int4 NOT NULL,
    "OrderVersion" int4 NOT NULL,
    "PaymentPlatformFees" int4 NOT NULL,
    "PlatformFees" int4 NOT NULL,
    "DeliveryFee" int4 NOT NULL,

    "IsFreeOfCharge" bool NOT NULL,
    "IsLocalDelivery" bool NOT NULL,
    "IsNationalDelivery" bool NOT NULL,
    "OrderIsPriced" bool NOT NULL,
   
    CONSTRAINT "PK_PricedOrder" PRIMARY KEY ("Id")
);


CREATE TABLE "Reservation"."PricedOrderLine" (
    "Id" uuid NOT NULL,
    "PricedOrderId" uuid NOT NULL,
   
    "Position" int4 NOT NULL,
    "Quantity" int4 NOT NULL,
    "LineTotal" int4 NOT NULL,
    "UnitPrice" int4 NOT NULL,

    "Description" text NULL,
    "Name" text NULL,

    "ProductExtras" jsonb not null default '[{}]'::jsonb,
   
    CONSTRAINT "PK_PricedOrderItem" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PricedOrderItem_PricedOrder_PricedOrderId" FOREIGN KEY ("PricedOrderId") REFERENCES "Reservation"."PricedOrder" ("Id") ON DELETE CASCADE
);
