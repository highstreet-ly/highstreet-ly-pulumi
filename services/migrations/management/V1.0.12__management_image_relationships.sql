alter TABLE "Management"."Image"
ADD COLUMN "EventOrganiserId" uuid  NULL;

alter TABLE "Management"."Image"
ADD CONSTRAINT "FK_Image_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE;

alter TABLE "Management"."Image"
ADD COLUMN "TicketTypeConfigurationId" uuid  NULL;

alter TABLE "Management"."Image"
ADD CONSTRAINT "FK_Image_TicketTypeConfiguration_TicketTypeConfigurationId" FOREIGN KEY ("TicketTypeConfigurationId") REFERENCES "Management"."TicketTypeConfiguration" ("Id") ON DELETE CASCADE;