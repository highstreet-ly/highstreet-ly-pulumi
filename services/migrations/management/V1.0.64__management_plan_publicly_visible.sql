ALTER TABLE "Management"."Plan" ADD COLUMN "PubliclyVisible" bool NULL;
UPDATE "Management"."Plan" SET "PubliclyVisible" = 't';
ALTER TABLE "Management"."Plan" ALTER COLUMN "PubliclyVisible" SET NOT NULL;