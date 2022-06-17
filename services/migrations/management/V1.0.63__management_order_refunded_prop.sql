ALTER TABLE "Management"."Order" ADD COLUMN "Refunded" bool NULL;
UPDATE "Management"."Order" SET "Refunded" = 'f';
ALTER TABLE "Management"."Order" ALTER COLUMN "Refunded" SET NOT NULL;