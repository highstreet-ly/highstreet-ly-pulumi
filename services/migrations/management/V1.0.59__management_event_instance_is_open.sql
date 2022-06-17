ALTER TABLE "Management"."EventInstance" ADD COLUMN "IsOpen"  boolean  NULL ;

UPDATE "Management"."EventInstance" SET "IsOpen" = 'f';
ALTER TABLE "Management"."EventInstance" ALTER COLUMN "IsOpen" SET NOT NULL;