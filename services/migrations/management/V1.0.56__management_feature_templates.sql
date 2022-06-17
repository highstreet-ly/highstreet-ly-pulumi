CREATE TABLE IF NOT EXISTS "Management"."BusinessTypeFeatureTemplates" (
    "Id" uuid NOT NULL default uuid_generate_v4(),
    "BusinessTypeId" uuid NOT NULL,

    CONSTRAINT "PK_BusinessTypeFeatureTemplates" PRIMARY KEY ("Id")
);


CREATE TABLE IF NOT EXISTS "Management"."BusinessTypeFeatureTemplateFeatures" (
    "BusinessTypeFeatureTemplateId" uuid NOT NULL,
    "FeatureId" uuid NOT NULL,
    CONSTRAINT "PK_BusinessTypeFeatureTemplateFeatures" PRIMARY KEY ("BusinessTypeFeatureTemplateId", "FeatureId"),
    CONSTRAINT "FK_BusinessTypeFeatureTemplateFeatures_Feature_FeatureId" FOREIGN KEY ("FeatureId") REFERENCES "Management"."Feature" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_BusinessTypeFeatureTemplateFeatures_BusinessTypeFeatureTemplate_BusinessTypeFeatureTemplateId" FOREIGN KEY ("BusinessTypeFeatureTemplateId") REFERENCES "Management"."BusinessTypeFeatureTemplates" ("Id") ON DELETE CASCADE
);