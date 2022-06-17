CREATE SCHEMA IF NOT EXISTS "Management";

CREATE TABLE "Management"."EventOrganiser" (
    "Id" uuid NOT NULL,
  
    "StripeAccountId" text NULL,
    "StripePublishableKey" text NULL,
    "StripeAccessToken" text NULL,
    "StripeLoginLink" text NULL,
    "StripeCode" text NULL,
    "Url" text NULL,
    "Description" text NULL,
    "Name" text NULL,
    "LogoId" text NULL,

    "PlatformFee" int4 NULL,
    "SchemaType" int4 NULL,

    "IsConnectedToStripe" bool NOT NULL,
   
    CONSTRAINT "PK_EventOrganiser" PRIMARY KEY ("Id")
);

CREATE TABLE "Management"."EventSeries" (
    "Id" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,
    "OwnerId" uuid NOT NULL,
  
    "Name" text NULL,
    "Description" text NULL,
    "DescriptionHtml" text NULL,
    "Slug" text NULL,
    "Category" text NULL,
    "OwnerName" text NULL,
    "OwnerEmail" text NULL,
    "Tagline" text NULL,
    "LogoId" text NULL,

    "MainImageId" text NULL,
    "HeroImageId" text NULL,
    "Hero2ImageId" text NULL,
    "LogoImageId" text NULL,

    "WasEverPublished" bool NOT NULL,
    "IsPublished" bool NOT NULL,
    "Featured" bool NOT NULL,
   
    CONSTRAINT "PK_EventSeries" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_EventSeries_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."EventInstance" (
    "Id" uuid NOT NULL,
    "EventSeriesId" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,    
    "OwnerId" uuid NOT NULL,
  
    "Name" text NULL,
    "Description" text NULL,
    "DescriptionHtml" text NULL,
    "Location" text NULL,
    "ShortLocation" text NULL,
    "PostCode" text NULL,
    "OwnerEmail" text NULL,
    "Tagline" text NULL,
    "Category" text NULL,
    "Lat" text NULL,
    "Lng" text NULL,
    "Slug" text NULL,
    "SupportEmail" text NULL,
    "SupportPhone" text NULL,
    "NotificationEmail" text NULL,
    "NotificationPhone" text NULL,
    "MainImageId" text NULL,
    "HeroImageId" text NULL,
    "Hero2ImageId" text NULL,
    "LogoImageId" text NULL,
   
    "NationalDeliveryFlatFee" int4  NULL,
    "NationalDeliveryFlatFeeFreeAfter" int4  NULL,
    "DeliveryRadiusMiles" int4  NULL,
    "OrdersConfirmed" int4  NULL,

    "WasEverPublished" bool NOT NULL,
    "IsPublished" bool NOT NULL,
    "Featured" bool NOT NULL,
    "IsClickAndCollect" bool NOT NULL,
    "IsLocalDelivery" bool NOT NULL,
    "IsNationalDelivery" bool NOT NULL,
    "ShowWaitingList" bool NOT NULL,
    "Deleted" bool NOT NULL,

    "DateCreated" timestamp default NULL,

    "OpeningTimes" jsonb not null default '{}'::jsonb,
   
    CONSTRAINT "PK_EventInstance" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_EventInstance_EventSeries_EventSeriesId" FOREIGN KEY ("EventSeriesId") REFERENCES "Management"."EventSeries" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_EventInstance_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."Order" (
    "Id" uuid NOT NULL,
    "EventInstanceId" uuid NOT NULL,
    "AssignmentsId" uuid NOT NULL,    
    "OwnerId" uuid NOT NULL,
    "RegistrantUserId" uuid NOT NULL, -- needed?
  
    "OwnerEmail" text NULL,
    "RegistrantName" text NULL,
    "RegistrantEmail" text NULL,
    "HumanReadableId" text NULL,
    "OwnerPhone" text NULL,
    "OwnerName" text NULL,
    "DeliveryLine1" text NULL,
    "DeliveryPostcode" text NULL,
    "RefundedReason" text NULL,
    "CustomerDispatchAdvisory" text NULL,
    
    "IsClickAndCollect" bool NOT NULL,
    "IsLocalDelivery" bool NOT NULL,
    "IsNationalDelivery" bool NOT NULL,

    "CreatedOn" timestamp default NULL,
    "ConfirmedOn" timestamp default NULL,
    "RefundedDateTime" timestamp default NULL,
    "PricedDateTime" timestamp default NULL,
    "PaidDateTime" timestamp default NULL,
    "ProcessingDateTime" timestamp default NULL,
    "ProcessingCompleteDateTime" timestamp default NULL,
    "ExpiredDateTime" timestamp default NULL,

    "TotalAmount" int4 NULL,
    "Status" int4 NULL,
   
    CONSTRAINT "PK_Order" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Order_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."TicketTypeConfiguration" (
    "Id" uuid NOT NULL,
    "EventInstanceId" uuid NOT NULL,    
  
    "Name" text NULL,
    "EventSlug" text NULL,
    "Description" text NULL,
    "MainImageId" text NULL,
    "Tags" text NULL,
    "Group" text NULL,
   
    "Price" int4  NULL,
    "Quantity" int4  NULL,
    "TicketsAvailabilityVersion" int4  NULL,
    "AvailableQuantity" int4  NULL,

    "ScheduleStartDate" timestamp default NULL,
    "ScheduleEndDate" timestamp default NULL,

    "FreeTier" bool NOT NULL,
    "IsPublished" bool NOT NULL,

    "ProductExtraGroups" jsonb not null default '[{}]'::jsonb,
   
    CONSTRAINT "PK_TicketTypeConfiguration" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_TicketTypeConfiguration_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."TicketType" (
    "Id" uuid NOT NULL,
    "EventInstanceId" uuid NOT NULL,   
  
    "Name" text NULL,
    "EventSlug" text NULL,
    "Description" text NULL,
    "MainImageId" text NULL,
    "Tags" text NULL,
    "Group" text NULL,
   
    "Price" int4  NULL,
    "Quantity" int4  NULL,
    "TicketsAvailabilityVersion" int4  NULL,
    "AvailableQuantity" int4  NULL,

    "ScheduleStartDate" timestamp default NULL,
    "ScheduleEndDate" timestamp default NULL,

    "FreeTier" bool NOT NULL,
    "IsPublished" bool NOT NULL,

    "ProductExtraGroups" jsonb not null default '[{}]'::jsonb,
   
    CONSTRAINT "PK_TicketType" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_TicketType_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);


CREATE TABLE "Management"."OrderTicket" (
    "Id" uuid NOT NULL,  
    "TicketTypeConfigurationId" uuid NOT NULL,  
    "OrderId" uuid NOT NULL,  
    
    "Position" int4 NULL,
  
    "TicketDetails" jsonb not null default '{}'::jsonb,
   
    CONSTRAINT "PK_OrderTicket" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_OrderTicket_TicketTypeConfiguration_TicketTypeConfigurationId" FOREIGN KEY ("TicketTypeConfigurationId") REFERENCES "Management"."TicketTypeConfiguration" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_OrderTicket_Order_OrderId" FOREIGN KEY ("OrderId") REFERENCES "Management"."Order" ("Id") ON DELETE CASCADE
);

