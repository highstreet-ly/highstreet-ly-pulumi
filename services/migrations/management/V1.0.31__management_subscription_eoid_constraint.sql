ALTER TABLE "Management"."Subscription" 
ADD CONSTRAINT "FK_Subscription_EventOrganiser_EventOrganiserId" FOREIGN KEY ("EventOrganiserId") REFERENCES "Management"."EventOrganiser" ("Id");