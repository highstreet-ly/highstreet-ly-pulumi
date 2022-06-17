CREATE TABLE "Management"."Plan" (
    "Id" uuid NOT NULL,
  
    "IntegrationId" text NULL,
    "Name" text NULL,
    "Description" text NULL,
    "PricingModel" text NULL,

    "Price" int4 NULL,
   
    CONSTRAINT "PK_Plan" PRIMARY KEY ("Id")
);

CREATE TABLE "Management"."AddOn" (
    "Id" uuid NOT NULL,
    "PlanId" uuid NOT NULL,
  
    "IntegrationId" text NULL,
    "Name" text NULL,
    "Description" text NULL,
    "PricingModel" text NULL,
    "Status" text NULL,

    "Price" int4 NULL,
   
    CONSTRAINT "PKAddOn" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AddOn_Plan_PlanId" FOREIGN KEY ("PlanId") REFERENCES "Management"."Plan" ("Id") ON DELETE CASCADE
);