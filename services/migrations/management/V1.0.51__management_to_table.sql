ALTER TABLE "Management"."Order"
    ADD COLUMN "IsToTable"  bool NULL;

ALTER TABLE "Management"."EventInstance"
    ADD COLUMN "IsToTable"  bool NULL;

ALTER TABLE "Management"."Order"
    ADD COLUMN "TableInfo" VARCHAR NULL;