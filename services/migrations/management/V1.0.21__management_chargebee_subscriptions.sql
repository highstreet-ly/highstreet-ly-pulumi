CREATE TABLE "Management"."Subscription" (
    "Id" uuid NOT NULL,
  
    "IntegrationId" text NULL,
    "CustomerId" text NULL,
    "PlanId" text NULL,
    "BillingPeriodUnit" text NULL,
    "Status" text NULL,
    "CurrencyCode" text NULL,


    "PlanQuantity" int4 NULL,
    "PlanUnitPrice" int4 NULL,
    "BillingPeriod" int4 NULL,
    "PlanFreeQuantity" int4 NULL,

    "TrialStart" int4 NULL,
    "TrialEnd" int4 NULL,
    "CurrentTermStart" int4 NULL,
    "CurrentTermEnd" int4 NULL,
    "CreatedAt" int4 NULL,
    "StartedAt" int4 NULL,
    "ActivatedAt" int4 NULL,
    "CancelledAt" int4 NULL,
    "UpdatedAt" int4 NULL,
    "ResourceVersion" int4 NULL,
    "DueInvoicesCount" int4 NULL,


    "Deleted" bool NOT NULL,
   
    CONSTRAINT "PK_Subscription" PRIMARY KEY ("Id")
);

DROP TABLE IF EXISTS "Management"."SubscriptionAddOns";

CREATE TABLE IF NOT EXISTS "Management"."SubscriptionAddOns" (
    "SubscriptionId" uuid NOT NULL,
    "AddOnId" uuid NOT NULL,
    CONSTRAINT "PK_SubscriptionAddOns" PRIMARY KEY ("SubscriptionId", "AddOnId"),
    CONSTRAINT "FK_SubscriptionAddOns_AddOn_AddOnId" FOREIGN KEY ("AddOnId") REFERENCES "Management"."AddOn" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_SubscriptionAddOns_Subscription_SubscriptionId" FOREIGN KEY ("SubscriptionId") REFERENCES "Management"."Subscription" ("Id") ON DELETE CASCADE
);
