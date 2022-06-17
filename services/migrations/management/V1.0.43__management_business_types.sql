CREATE TABLE "Management"."BusinessType" (
    "Id" uuid NOT NULL default uuid_generate_v4(),
    "Name" text NULL,
    "Description" text NULL,
   
    CONSTRAINT "PK_BusinessType" PRIMARY KEY ("Id")
);

alter TABLE "Management"."EventInstance"
ADD COLUMN "BusinessTypeId" uuid  null;


ALTER TABLE "Management"."EventInstance"
	ADD CONSTRAINT "FK_EventInstance_BusinessType_BusinessTypeId" 
	FOREIGN KEY ("BusinessTypeId") REFERENCES "Management"."BusinessType" ("Id") ON DELETE CASCADE;

INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Bank');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Pharmacy');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Restaurant / Cafe');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Clothes Shop');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Newsagent');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Homeware Store');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Barbers / Hairdressers');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Book Store');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Coffee Shop');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Department Store');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Supermarket');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Electronic Goods Store');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Pub');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Cinema');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Fast Food Restaurant / Takeaway');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Music / Movies / Video Games Store');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Charity Shop');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Travel Agent');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Mobile Phone Store');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Beauty Salon');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Off License');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Petrol Station');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Launderette / Dry Cleaners');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Tattoo / Piercing');
INSERT INTO "Management"."BusinessType" ("Name") VALUES ('Tobacco / Vape');