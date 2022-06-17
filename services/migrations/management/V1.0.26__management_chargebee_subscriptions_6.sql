

ALTER TABLE "Management"."Plan" 
ADD COLUMN "Deleted" bool  NULL;

ALTER TABLE "Management"."AddOn" 
ADD COLUMN "Deleted" bool  NULL;

CREATE TABLE "Management"."Feature" (
    "Id" uuid NOT NULL default uuid_generate_v4(),
   
    "Name" text NULL,
    "Description" text NULL,
    "ClaimValue" text NULL,
    "Deleted" bool NULL,
   
    CONSTRAINT "PKFeature" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS "Management"."PlanFeatures" (
    "PlanId" uuid NOT NULL,
    "FeatureId" uuid NOT NULL,
    CONSTRAINT "PK_PlanFeatures" PRIMARY KEY ("PlanId", "FeatureId"),
    CONSTRAINT "FK_PlanFeatures_Feature_FeatureId" FOREIGN KEY ("FeatureId") REFERENCES "Management"."Feature" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PlanFeatures_Plan_PlanId" FOREIGN KEY ("PlanId") REFERENCES "Management"."Plan" ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Management"."AddOnFeatures" (
    "AddOnId" uuid NOT NULL,
    "FeatureId" uuid NOT NULL,
    CONSTRAINT "PK_AddOnFeatures" PRIMARY KEY ("AddOnId", "FeatureId"),
    CONSTRAINT "FK_AddOnFeatures_Feature_FeatureId" FOREIGN KEY ("FeatureId") REFERENCES "Management"."Feature" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AddOnFeatures_AddOn_AddOnId" FOREIGN KEY ("AddOnId") REFERENCES "Management"."AddOn" ("Id") ON DELETE CASCADE
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Product Upsells',
    '',
    'product-upsells'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Real time customer notifications',
    '',
    'real-time-customer-notifications'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Multi Franchise',
    '',
    'multi-franchise'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'To table delivery',
    '',
    'to-table-delivery'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Courier Delivery',
    '',
    'courier-delivery'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Shop Delivers',
    '',
    'shop-delivers'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Click and collect',
    '',
    'click-and-collect'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Team',
    '',
    'team'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Multi Shop',
    '',
    'multi-shop'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Widget',
    '',
    'widget'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Dashboard',
    '',
    'dashboard'
);

INSERT INTO "Management"."Feature" ("Name", "Description", "ClaimValue") values (
    'Operator App',
    '',
    'operator-app'
);