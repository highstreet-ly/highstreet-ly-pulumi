
CREATE TABLE "Management"."Image" (
    "Id" uuid NOT NULL,
    "EventSeriesId" uuid  NULL,
    "EventInstanceId" uuid  NULL,
    "TicketTypeId" uuid  NULL,
  
    "ExternalImageId" text NULL,
   
    CONSTRAINT "PK_Image" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Image_EventSeries_EventSeriesId" FOREIGN KEY ("EventSeriesId") REFERENCES "Management"."EventSeries" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Image_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Image_TicketType_TicketTypeId" FOREIGN KEY ("TicketTypeId") REFERENCES "Management"."TicketType" ("Id") ON DELETE CASCADE
);
