CREATE TABLE "Management"."OrderTicketDetails" (
    "Id" uuid NOT NULL,
    "OrderTicketId" uuid NOT NULL, 
    "EventInstanceId" uuid NOT NULL,
      
    "Name" text NULL,
    "DisplayName" text NULL,
   
    "Price" NUMERIC(10,2) NULL,
    "Quantity" int4 NULL,
   
    CONSTRAINT "PK_OrderTicketDetails" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_OrderTicketDetails_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_OrderTicketDetails_OrderTicket_OrderTicketId" FOREIGN KEY ("OrderTicketId") REFERENCES "Management"."OrderTicket" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."ProductExtraGroup" (
    "Id" uuid NOT NULL,
    "TicketTypeConfigurationId" uuid NULL,
    "TicketTypeId" uuid NULL,
      
    "Name" text NULL,
    "Description" text NULL,
   
    "MaxSelectable" int4 NULL,
    "MinSelectable" int4 NULL,
   
    CONSTRAINT "PK_ProductExtraGroup" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ProductExtraGroup_TicketTypeConfiguration_TicketTypeConfigurationId" FOREIGN KEY ("TicketTypeConfigurationId") REFERENCES "Management"."TicketTypeConfiguration" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProductExtraGroup_TicketType_TicketTypeId" FOREIGN KEY ("TicketTypeId") REFERENCES "Management"."TicketType" ("Id") ON DELETE CASCADE
);


CREATE TABLE "Management"."ProductExtra" (
    "Id" uuid NOT NULL,
    "OrderTicketDetailsId" uuid NOT NULL,
    "ProductExtraGroupId" uuid NOT NULL,
      
    "Name" text NULL,
    "Description" text NULL,
   
    "Price" NUMERIC(10,2) NULL,
    "ItemCount" int4 NULL,

    "Selected" bool NULL,
   
    CONSTRAINT "PK_ProductExtra" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ProductExtra_OrderTicketDetails_OrderTicketDetailsId" FOREIGN KEY ("OrderTicketDetailsId") REFERENCES "Management"."OrderTicketDetails" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProductExtra_ProductExtraGroup_ProductExtraGroupId" FOREIGN KEY ("ProductExtraGroupId") REFERENCES "Management"."ProductExtraGroup" ("Id") ON DELETE CASCADE
);