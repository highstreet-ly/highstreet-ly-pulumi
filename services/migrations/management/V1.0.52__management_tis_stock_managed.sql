ALTER TABLE "Management"."EventInstance"  ADD COLUMN "IsStockManaged"  bool NULL;

UPDATE "Management"."EventInstance" SET "IsStockManaged" = 't';
ALTER TABLE "Management"."EventInstance" ALTER COLUMN "IsStockManaged" SET NOT NULL;
ALTER TABLE "Management"."EventInstance" ALTER COLUMN "IsStockManaged" SET DEFAULT TRUE;
