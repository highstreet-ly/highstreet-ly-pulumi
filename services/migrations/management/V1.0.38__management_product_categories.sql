
CREATE TABLE "Management"."ProductCategory" (
    "Id" uuid NOT NULL,
    "EventInstanceId" uuid NOT NULL,
    "Name" text NULL,
    "Description" text NULL,
    "MainImageId" text NULL,
    "SortOrder" int4  NULL,
    "Enabled" bool NOT NULL default true,
    "Metadata" jsonb not null default '{}'::jsonb,
    
    CONSTRAINT "PK_ProductCategory" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ProductCategory_EventInstance_EventInstanceId" FOREIGN KEY ("EventInstanceId") REFERENCES "Management"."EventInstance" ("Id") ON DELETE CASCADE
);