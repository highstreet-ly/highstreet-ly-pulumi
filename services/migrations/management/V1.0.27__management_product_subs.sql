ALTER TABLE "Management"."Plan" 
ADD COLUMN "EventOrganiserId" uuid  NULL;

ALTER TABLE "Management"."Plan" 
ADD COLUMN "EventInstanceId" uuid  NULL;

ALTER TABLE "Management"."Plan" 
ADD CONSTRAINT "FK_Plan_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id");

ALTER TABLE "Management"."Plan" 
ADD CONSTRAINT "FK_Plan_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id");

CREATE TABLE IF NOT EXISTS "Management"."PlanTickets" (
    "PlanId" uuid NOT NULL,
    "TicketTypeConfigurationId" uuid NOT NULL,
    CONSTRAINT "PK_PlanTickets" PRIMARY KEY ("PlanId", "TicketTypeConfigurationId"),
    CONSTRAINT "FK_PlanTickets_TicketTypeConfiguration_TicketTypeConfigurationId" FOREIGN KEY ("TicketTypeConfigurationId") REFERENCES "Management"."TicketTypeConfiguration" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PlanTickets_Plan_PlanId" FOREIGN KEY ("PlanId") REFERENCES "Management"."Plan" ("Id") ON DELETE CASCADE
);