ALTER TABLE "Management"."Feature" ADD COLUMN "FeatureType"  VARCHAR  NULL ;

UPDATE "Management"."Feature" SET "FeatureType" = 'Plan';
ALTER TABLE "Management"."Feature" ALTER COLUMN "FeatureType" SET NOT NULL;