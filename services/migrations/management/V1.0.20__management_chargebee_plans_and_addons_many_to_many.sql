CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "Management"."PlanAddOns";

CREATE TABLE IF NOT EXISTS "Management"."PlanAddOns" (
    "PlanId" uuid NOT NULL,
    "AddOnId" uuid NOT NULL,
    CONSTRAINT "PK_PlanAddOns" PRIMARY KEY ("PlanId", "AddOnId"),
    CONSTRAINT "FK_PlanAddOns_AddOn_AddOnId" FOREIGN KEY ("AddOnId") REFERENCES "Management"."AddOn" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PlanAddOns_Plan_PlanId" FOREIGN KEY ("PlanId") REFERENCES "Management"."Plan" ("Id") ON DELETE CASCADE
);

DELETE FROM "Management"."AddOn";

ALTER TABLE "Management"."AddOn"
	DROP COLUMN "PlanId";

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "ChargeType"  text NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "CurrencyCode"  text NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "Period"  int4 NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "PeriodUnit"  text NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "EnabledInPortal"  bool NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "IsShippable"  bool NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "ShowDescriptionInInvoices"  bool NULL;

ALTER TABLE "Management"."AddOn"
    ADD COLUMN "ShowDescriptionInQuotes"  bool NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "ChargeModel"  text NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "CurrencyCode"  text NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "EnabledInHostedPages"  bool NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "EnabledInPortal"  bool NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "FreeQuantity"  int4 NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "Period"  int4 NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "PeriodUnit"  text NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "ShowDescriptionInInvoices"  bool NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "ShowDescriptionInQuotes"  bool NULL;

ALTER TABLE "Management"."Plan"
    ADD COLUMN "Taxable"  bool NULL;