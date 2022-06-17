ALTER TABLE "Management"."Subscription" 
RENAME COLUMN "PlanId" TO "PlanIntegrationId";

ALTER TABLE "Management"."Subscription" 
ADD COLUMN "PlanId" uuid NOT NULL;

ALTER TABLE "Management"."Subscription" 
ADD CONSTRAINT "FK_Subscription_Plan_PlanId" FOREIGN KEY ("PlanId") REFERENCES "Management"."Plan" ("Id");