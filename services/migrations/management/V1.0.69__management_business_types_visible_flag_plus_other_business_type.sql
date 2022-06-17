alter TABLE  "Management"."BusinessType" ADD COLUMN "IsPublished" bool NULL;
UPDATE "Management"."BusinessType" SET "IsPublished" = 't';
ALTER TABLE "Management"."BusinessType" ALTER COLUMN "IsPublished" SET DEFAULT TRUE;
ALTER TABLE "Management"."BusinessType" ALTER COLUMN "IsPublished" SET NOT NULL;