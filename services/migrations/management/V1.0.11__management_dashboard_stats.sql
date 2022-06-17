CREATE TABLE "Management"."DashboardStat" (
    "Id" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,    

    "TotalOrdersAbandoned" int4  NULL,
    "TotalOrdersFullfiled" int4  NULL,

    CONSTRAINT "PK_DashboardStat" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_DashboardStat_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."RegisteredInterestByDay" (
    "Id" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,    
    "EventSeriesId" uuid NOT NULL,    
    "DashboardStatId" uuid NOT NULL,    
    "EventInstanceId" uuid NOT NULL,    

    "Year" int4  NULL,
    "Month" int4  NULL,
    "Day" int4  NULL,
    "Total" int4  NULL,
    "TotalFunds" int4  NULL,

    CONSTRAINT "PK_RegisteredInterestByDay" PRIMARY KEY ("Id"),

    CONSTRAINT "FK_RegisteredInterestByDay_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RegisteredInterestByDay_EventSeries_EventSeriesId" FOREIGN KEY ("EventSeriesId") REFERENCES "Management"."EventSeries" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RegisteredInterestByDay_DashboardStat_DashboardStatId" FOREIGN KEY ("DashboardStatId") REFERENCES "Management"."DashboardStat" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RegisteredInterestByDay_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."RefundsByDay" (
    "Id" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,    
    "EventSeriesId" uuid NOT NULL,    
    "DashboardStatId" uuid NOT NULL,    
    "EventInstanceId" uuid NOT NULL,    

    "Year" int4  NULL,
    "Month" int4  NULL,
    "Day" int4  NULL,
    "Total" int4  NULL,
    "TotalFunds" int4  NULL,

    CONSTRAINT "PK_RefundsByDay" PRIMARY KEY ("Id"),

    CONSTRAINT "FK_RefundsByDay_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RefundsByDay_EventSeries_EventSeriesId" FOREIGN KEY ("EventSeriesId") REFERENCES "Management"."EventSeries" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RefundsByDay_DashboardStat_DashboardStatId" FOREIGN KEY ("DashboardStatId") REFERENCES "Management"."DashboardStat" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RefundsByDay_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."TicketsSoldByDay" (
    "Id" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,    
    "EventSeriesId" uuid NOT NULL,    
    "DashboardStatId" uuid NOT NULL,    
    "EventInstanceId" uuid NOT NULL,    

    "Year" int4  NULL,
    "Month" int4  NULL,
    "Day" int4  NULL,
    "Total" int4  NULL,
    "TotalFunds" int4  NULL,

    CONSTRAINT "PK_TicketsSoldByDay" PRIMARY KEY ("Id"),

    CONSTRAINT "FK_TicketsSoldByDay_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_TicketsSoldByDay_EventSeries_EventSeriesId" FOREIGN KEY ("EventSeriesId") REFERENCES "Management"."EventSeries" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_TicketsSoldByDay_DashboardStats_DashboardStatsId" FOREIGN KEY ("DashboardStatId") REFERENCES "Management"."DashboardStat" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_TicketsSoldByDay_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Management"."OrdersByDay" (
    "Id" uuid NOT NULL,
    "EventOrganiserId" uuid NOT NULL,    
    "EventSeriesId" uuid NOT NULL,    
    "DashboardStatId" uuid NOT NULL,    
    "EventInstanceId" uuid NOT NULL,    

   "Year" int4  NULL,
    "Month" int4  NULL,
    "Day" int4  NULL,
    "Total" int4  NULL,
    "TotalFunds" int4  NULL,

    CONSTRAINT "PK_OrdersByDay" PRIMARY KEY ("Id"),

    CONSTRAINT "FK_OrdersByDay_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_OrdersByDay_EventSeries_EventSeriesId" FOREIGN KEY ("EventSeriesId") REFERENCES "Management"."EventSeries" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_OrdersByDay_DashboardStats_DashboardStatsId" FOREIGN KEY ("DashboardStatId") REFERENCES "Management"."DashboardStat" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_OrdersByDay_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);