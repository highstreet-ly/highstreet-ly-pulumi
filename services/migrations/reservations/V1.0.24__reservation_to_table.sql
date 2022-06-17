ALTER TABLE "Reservation"."PricedOrder"
    ADD COLUMN "IsToTable"  bool NULL;

ALTER TABLE "Reservation"."PricedOrder"
    ADD COLUMN "TableInfo" VARCHAR  NULL;

ALTER TABLE "Reservation"."DraftOrder"
    ADD COLUMN "IsToTable"  bool NULL;

ALTER TABLE "Reservation"."DraftOrder"
    ADD COLUMN "TableInfo" VARCHAR  NULL;