CREATE TABLE IF NOT EXISTS "Management"."EventInstanceFeatures" (
    "EventInstanceId" uuid NOT NULL,
    "FeatureId" uuid NOT NULL,
    CONSTRAINT "PK_EventInstanceFeatures" PRIMARY KEY ("EventInstanceId", "FeatureId"),
    CONSTRAINT "FK_EventInstanceFeatures_Feature_FeatureId" FOREIGN KEY ("FeatureId") REFERENCES "Management"."Feature" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_EventInstanceFeatures_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);