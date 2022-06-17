DROP TABLE "Management"."PlanTickets";

CREATE TABLE IF NOT EXISTS "Management"."PlanTickets" (
    "PlanId" uuid NOT NULL,
    "TicketTypeId" uuid NOT NULL,
    CONSTRAINT "PK_PlanTickets" PRIMARY KEY ("PlanId", "TicketTypeId"),
    CONSTRAINT "FK_PlanTickets_TicketType_TicketTypeId" FOREIGN KEY ("TicketTypeId") REFERENCES "Management"."TicketType" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PlanTickets_Plan_PlanId" FOREIGN KEY ("PlanId") REFERENCES "Management"."Plan" ("Id") ON DELETE CASCADE
);