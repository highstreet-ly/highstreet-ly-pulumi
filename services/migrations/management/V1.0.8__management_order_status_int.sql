ALTER TABLE "Management"."Order" 
ALTER COLUMN "Status" TYPE int4 USING "Status"::integer;