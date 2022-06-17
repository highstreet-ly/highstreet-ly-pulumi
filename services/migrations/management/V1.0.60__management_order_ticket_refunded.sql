ALTER TABLE "Management"."OrderTicket" ADD COLUMN "Refunded"  boolean  NULL ;

UPDATE "Management"."OrderTicket" SET "Refunded" = 'f';
ALTER TABLE "Management"."OrderTicket" ALTER COLUMN "Refunded" SET NOT NULL;