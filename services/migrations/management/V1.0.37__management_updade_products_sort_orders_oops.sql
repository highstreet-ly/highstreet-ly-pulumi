ALTER TABLE "Management"."TicketType"
    ADD COLUMN "SortOrder"  int4 NULL;

ALTER TABLE "Management"."TicketTypeConfiguration"
    ADD COLUMN "SortOrder"  int4 NULL;

ALTER TABLE "Management"."ProductExtra"
    ADD COLUMN "SortOrder"  int4 NULL;

ALTER TABLE "Management"."ProductExtraGroup"
    ADD COLUMN "SortOrder"  int4 NULL;

ALTER TABLE "Management"."TicketType"
    DROP COLUMN "Period";

ALTER TABLE "Management"."TicketTypeConfiguration"
    DROP COLUMN "Period";

ALTER TABLE "Management"."ProductExtra"
    DROP COLUMN "Period";

ALTER TABLE "Management"."ProductExtraGroup"
    DROP COLUMN "Period";